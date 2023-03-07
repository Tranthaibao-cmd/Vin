import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-answer-option',
  templateUrl: './answer-option.component.html',
  styleUrls: ['./answer-option.component.scss']
})
export class AnswerOptionComponent implements OnInit {

  //for testing purposes
  testCheck:any
  //may be multiple options or just one option

  @Input('answer') answer:Answer

  touch:boolean = false;
  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {
      if(this.eRef.nativeElement.contains(event.target)) {
        this.touch = true
      } else {
        this.touch = false
      }
    }

}
