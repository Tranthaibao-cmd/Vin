import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Content } from '../../models/content';

@Component({
  selector: 'app-lecture-creation',
  templateUrl: './lecture-creation.component.html',
  styleUrls: ['./lecture-creation.component.scss']
})
export class LectureCreationComponent implements OnInit {
  @Input("content") content :Content = {}
  @Output('btn-click') btnClick = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  btnClickHandler(status:number){
    //status 0:cancel,1:save
    this.btnClick.emit({status:status,data:this.content});
  }

}
