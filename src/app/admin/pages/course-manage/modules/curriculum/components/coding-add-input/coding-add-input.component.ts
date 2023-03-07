import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Parameter } from '../../models/parameter';

@Component({
  selector: 'app-coding-add-input',
  templateUrl: './coding-add-input.component.html',
  styleUrls: ['./coding-add-input.component.scss'],
})
export class CodingAddInputComponent implements OnInit {
  @Input('parameter') parameter: Parameter = {name:'',datatype:''};
  @Output('btn-click') btnClick =  new EventEmitter();
  ParamFormGroup: FormGroup;
  ParamAttributes :any
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
  constructor(private formBuilder: FormBuilder) {

  }

  get ParamFormValue(){
    return this.ParamFormGroup.value
  }
  ngOnInit() {
    this.ParamAttributes= {
      id:new FormControl(this.parameter.id),
      input_name: new FormControl(this.parameter.name, [Validators.required]),
      data_type: new FormControl(this.parameter.datatype, [Validators.required]),

    };

    this.ParamFormGroup = this.formBuilder.group(this.ParamAttributes);
  }
  emitEvent(mode_code:number){
    let dataEmit
    if(mode_code == 0){
      dataEmit = {
        mode_code:mode_code
      }
    }
    else{
      dataEmit = {mode_code:mode_code,data:this.ParamFormValue}
    }
    this.btnClick.emit(dataEmit)
  }
}
