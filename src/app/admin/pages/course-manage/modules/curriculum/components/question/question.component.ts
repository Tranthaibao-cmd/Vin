import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Answer } from '../../models/answer';
import { Question } from '../../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class QuestionComponent implements OnInit {
  @Input("question") question: Question

  @Output('btn-click') btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  trackByFn(index: number, item: any) {
    return item.id;
  }

  removeAnswer(answer_id: string) {

    this.question.answers = this.question.answers.filter((ans) => ans.id != answer_id);
  }
  btnClickFn(status: number, data: any) {
    this.btnClick.emit({ status: status, data: data });
  }
  saveRightAnswer(answer_id: string){
   let answer_id_exists = this.question.answers_right_id.includes(answer_id);
   //if radio button then just one answer right
   if(this.question.question_type == 'radio' && !answer_id_exists){
      this.question.answers_right_id.pop();
      this.question.answers_right_id.push(answer_id)
      return
   }
   //if checkbox button
   if(this.question.question_type == 'checkbox'){
     //if clicked then delete it else add it
     if(answer_id_exists)
        this.question.answers_right_id = this.question.answers_right_id.filter(ans_id=>ans_id != answer_id)
    else
      this.question.answers_right_id.push(answer_id)
   }

  }
  // saveQuestion() {
  //   console.log(this.answerOfQuestion)
  // }
}
