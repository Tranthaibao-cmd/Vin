import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Function } from '../../models/function';
import { TestCase } from '../../models/testcase';
import { TestcaseService } from '../../services/testcase.service';

@Component({
  selector: 'app-testcase',
  templateUrl: './testcase.component.html',
  styleUrls: ['./testcase.component.scss'],
})
export class TestCaseComponent implements OnInit {
  @Input('content-id') contentId: string;
  @Input('course-id') course_id: string;
  @Input('function') function: Function;

  //used to update or add a testcase
  mode: string = 'add';
  testcaseObservable: Observable<Array<TestCase>>;
  testcaseList: Array<TestCase> = [];
  testcaseAddOredit: TestCase;
  addTestcase: boolean = false;
  constructor(private tescaseService: TestcaseService) {}

  ngOnInit() {
    this.testcaseObservable = this.tescaseService.getAllTestcaseViaContentId(
      this.contentId
    );
  }
  addTestCaseFn() {
    this.mode = 'add';
    this.testcaseAddOredit = {
      inputs: this.function.inputs,
      output: {
        datatype: this.function.output_data_type,
        value: '',
      },
    };
    this.addTestcase = true;
  }

  btnClickEventHandler(event: any, testcaselist: Array<TestCase>) {
    if (event.btn_status == 1) {
      let testcase: TestCase = event.data;
      //add to database
      let testcase_add: TestCase = {
        ...testcase,
        content_id: this.contentId,
        course_id: this.course_id,
      };
      if (this.mode == 'add') {
        testcaselist.push(testcase);
        this.tescaseService.addTestcase(testcase_add).subscribe();
      } else {
        //update testcase
        let testcaseIndex = testcaselist.findIndex(
          (ts) => ts.id == testcase.id
        );
        testcaselist[testcaseIndex] = testcase;

        //update to database
        this.tescaseService.updateTestcase(testcase.id, testcase).subscribe();
      }
    }

    this.addTestcase = false;
  }

  editTestcase(testcase: TestCase) {
    this.mode = 'edit';
    this.testcaseAddOredit = testcase;
    this.addTestcase = true;
  }

  deleteTestcase(testcase_id: string, testcaselist: Array<TestCase>) {
    //update screen

    let testcaseIndex = testcaselist.findIndex((ts) => ts.id != testcase_id);
    testcaselist.splice(testcaseIndex, 1);

    //delete in database
    this.tescaseService.deleteTestcase(testcase_id).subscribe();
  }

  trackBy(index: number, item: any) {
    return item.id;
  }

}
