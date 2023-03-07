import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizesService } from '../_services/quizes.service';

@Component({
  selector: 'app-my-coding-exam-history',
  templateUrl: './my-coding-exam-history.component.html',
  styleUrls: ['./my-coding-exam-history.component.scss'],
})
export class MyCodingExamHistoryComponent implements OnInit {
  object_id: any;

  is_mode_of_view_my_exam:boolean = true;

  myCodingExamHistory: Observable<any> = new Observable<any>();

  constructor(
    private QuizService: QuizesService,
    private route: ActivatedRoute
  ) {
    this.object_id = this.route.snapshot.paramMap.get('object_id');
  }

  ngOnInit() {
      this.onGetCodingExamHistory(this.object_id)
  }

  onGetCodingExamHistory(object_id: string) {
    this.is_mode_of_view_my_exam = true
    this.myCodingExamHistory = this.QuizService.getCodingExamHistory(
      object_id
    ).pipe(map((data) => {
        return data.data;
    }));
  }

  onGetSolution(quiz_id:number)
  {
    this.is_mode_of_view_my_exam = false;
    this.myCodingExamHistory = this.QuizService.getSolutionCodingExam(quiz_id).pipe(map((data)=>
    {
      return data.data;
    }))
  }
}
