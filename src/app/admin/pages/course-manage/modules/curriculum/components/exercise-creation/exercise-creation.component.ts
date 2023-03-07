import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Content } from '../../models/content';

@Component({
  selector: 'app-exercise-creation',
  templateUrl: './exercise-creation.component.html',
  styleUrls: ['./exercise-creation.component.scss']
})
export class ExerciseCreationComponent implements OnInit {
  @Input("title-creation") titleCreation:string = '';
  @Input("content") content:Content = {}
  @Output('btn-click') btnClick = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  btnClickHandler(status:number){
    //status 0:cancel,1:save
    this.btnClick.emit({status:status,data:this.content});

  }

}
