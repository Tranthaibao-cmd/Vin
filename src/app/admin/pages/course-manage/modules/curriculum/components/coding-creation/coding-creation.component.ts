import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Function } from '../../models/function';
import { Parameter } from '../../models/parameter';
import { FunctionService } from '../../services/function.service';
import { TestcaseService } from '../../services/testcase.service';

@Component({
  selector: 'app-coding-creation',
  templateUrl: './coding-creation.component.html',
  styleUrls: ['./coding-creation.component.scss'],
})
export class CodingCreationComponent implements OnInit {
  @Input('content-id') content_id: string;
  @Input('course-id') course_id: string;
  //trace whether function param is update  to remove all testcase since param change lead to all testcase must change
  paramChange = false;
  params: Array<Parameter> = [];
  paramForEditOrAdd: Parameter;
  showTestcase: boolean = false;

  //whether add or update parameters mode
  mode: string = 'add';
  FunctionFormGroup: FormGroup;
  functionFormAttributes = {
    name: new FormControl('', [Validators.required]),
    execution_time: new FormControl('', [Validators.required]),
    output_data_type: new FormControl('', [Validators.required]),
  };
  functionObservable: Observable<any>;
  isAddCodingInput: boolean = false;

  inputParameter = false;
  showBtnInput = true;
  showBtnTest = true;
  showTestCasse = false;

  dataTypeList: Array<string> = [
    'any',
    'string',
    'integer',
    'char',
    'float',
    'boolean',
    'array[any]',
    'array[string]',
    'array[integer]',
    'array[float]',
    'array[boolean]',
    'array[char]',
  ];
  constructor(
    private formBuilder: FormBuilder,
    private funcService: FunctionService,
    private testcaseService: TestcaseService
  ) {}
  ngOnInit(): void {
    this.FunctionFormGroup = this.formBuilder.group(
      this.functionFormAttributes
    );
    this.functionObservable = this.funcService
      .getFunction(this.content_id)
      .pipe(
        map((res: any) => {
          let data: Function = res.data;
          //asign params list
          this.params = data.inputs;
          this.FunctionFormGroup.patchValue({
            name: data.name,
            execution_time: data.execution_time,
            output_data_type: data.output_data_type,
          });
        })
      );
  }
  addInput() {
    this.showBtnInput = false;
    this.showTestCasse = true;
  }

  get FunctionForm(): any {
    return this.FunctionFormGroup.value;
  }
  addTestCase() {
    this.showBtnTest = false;
    this.showTestCasse = true;
  }

  saveFunction() {
    if (this.paramChange) {
      //not delete all testcase via content id
    }

    let func: Function = {
      ...this.FunctionForm,
      inputs: this.params,
      course_id: this.course_id,
      content_id: this.content_id,
    };
    this.funcService.updateFunction(func).subscribe();
  }

  addParam() {
    if(!this.confirmChangeInputParams(this.content_id)) return
    this.mode = 'add';
    this.paramChange = true;
    this.paramForEditOrAdd = {
      id: String(Date.now()) + Math.random().toString(16).slice(2),
      name: '',
      datatype: 'string',
      value: '',
    };
    this.isAddCodingInput = true;
  }

  editParam(param: Parameter) {
    if(!this.confirmChangeInputParams(this.content_id)) return
    this.mode = 'edit';
    this.paramChange = true;
    this.paramForEditOrAdd = param;
    this.isAddCodingInput = true;
  }

  deleteParam(param_id: string) {
    if(!this.confirmChangeInputParams(this.content_id)) return
    this.paramChange = true;
    this.params = this.params.filter((p) => p.id != param_id);
  }

  codingAddInputEvent(event: any) {
    if (event.mode_code == 1) {
      let param: Parameter = {
        id: event.data.id,
        name: event.data.input_name,
        datatype: event.data.data_type,
      };
      if (this.mode == 'add') {
        this.params.push(param);
      } else {
        let paramEditIndex = this.params.findIndex(
          (param) => param.id == event.data.id
        );

        this.params[paramEditIndex] = param;
      }
    }

    this.isAddCodingInput = false;
  }

  confirmChangeInputParams(contentId:string):boolean {
    let res = confirm(
      'Nếu dữ liệu đầu vào thay đổi dẫn đến thông tin testcase thay đổi theo vậy nên dữ liệu testcase lúc trước sẽ bị mất hết. Bạn có chắc muốn thay đổi '
    );
    if(res){
      this.testcaseService.deleteAllTestcaseOfContent(contentId).subscribe()
    }
    return res
  }


}
