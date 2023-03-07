import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestCase } from '../../models/testcase';

@Component({
  selector: 'app-testcase-creation',
  templateUrl: './testcase-creation.component.html',
  styleUrls: ['./testcase-creation.component.scss'],
})
export class TestcaseCreationComponent implements OnInit {
  @Input('testcase') testcase: TestCase;
  @Output('btn-click') emiter = new EventEmitter();
  testcaseCopy: TestCase
  constructor() {}

  ngOnInit() {
    this.testcaseCopy = JSON.parse(JSON.stringify(this.testcase))
  }

  btnClickEvent(btn_status: number) {

    let data;
    if (btn_status == 1) data = this.testcaseCopy;
    this.emiter.emit({ btn_status: btn_status, data: data });
  }
}
