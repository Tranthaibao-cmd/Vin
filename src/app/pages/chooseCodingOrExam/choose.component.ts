
import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-coding-screen',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss','./normalize.scss'],
})
export class ChooseComponent{
  course_id:number
    constructor(private route:ActivatedRoute)
    {
      this.course_id = Number(this.route.snapshot.queryParamMap.get('course_id')!)
      
    }
  
}
