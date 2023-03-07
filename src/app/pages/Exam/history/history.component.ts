import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quiz } from '../QuizModel/quiz';
import { QuizesService } from '../_services/quizes.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  contentLoaded = false 
  quiz_history:Observable<any>= new Observable<any>();
  object_id:any
  total_questions:number = 0
  constructor(private route:ActivatedRoute,
    private quizService:QuizesService ) { }

  ngOnInit(): void {
    this.object_id = this.route.snapshot.paramMap.get('object_id')
    this.onGetHistory(this.object_id)
  }

  onGetHistory(object_id:string){
    this.quiz_history = this.quizService.getHistoryExamDetail(object_id).pipe(map(data=>{
      this.contentLoaded = true
      this.total_questions = data.data.quiz.questions.length
      return data.data
      
    }))
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    var btn = document.getElementById('button');
    //alert(window.pageYOffset)
    if (window.pageYOffset > 100) {
      (btn as HTMLInputElement).classList.add('show');
      (btn as HTMLInputElement).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
    </svg>`;
    } else {
      (btn as HTMLInputElement).classList.remove('show');
    }
  }

  scrollUpToTop() {
    document.getElementById('wrapper')?.scrollIntoView({behavior:'smooth'})
  }

  ScrollToSpecificSentence(sentence: number) {
    document.getElementById(`${sentence}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  trackByFunction(index:number,item:any)
  {
    return item.id
  }



}
