import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { first, map } from 'rxjs/operators';

import { Question } from 'src/app/pages/Exam/QuizModel/question';
import { Option } from 'src/app/pages/Exam/QuizModel/option';
import { Observable, Subscription } from 'rxjs';
import { ClockComponent } from '../../../core/modules/components/clock/clock.component';
import { QuizesService } from '../_services/quizes.service';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Quiz } from '../QuizModel/quiz';
import Swal from 'sweetalert2';
import { Exam } from './interfaces/exam';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  //declaration var
  course_name: any;
  quiz_name: any;
  quiz_id: any;
  mode:any;
  exam:Exam;
//subscriptions
  exam_obv: Observable<any> = new Observable<any>();
  subscription: Subscription = new Subscription();



  ctx = { data: [0, 0, 0, 0], data2: [0, 0, 0] };
  //execute before refresh page
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    //save history before loading page
    //this.saveStatus();

    event.returnValue = true;
  }

  @ViewChild('clock') clock!: ClockComponent;


  constructor(
    private _http: HttpClient,
    private quizService: QuizesService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  this.mode = { is_multichoice_mode: true, contentLoaded: false }
  this.exam = { theoretical_part: { quiz: new Quiz(), total_questions: 0 }, practice_part: { link: '', host: '' }, end_time:0,limit_time:0 }
  }

  ngOnInit() {

    this.course_name = this.route.snapshot.queryParamMap.get('course_name');
    this.quiz_name = this.route.snapshot.queryParamMap.get('quiz_name');
    this.quiz_id = this.route.snapshot.queryParamMap.get('quiz_id');
    //for reload to current page
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    console.log(this.quiz_name, this.quiz_id,this.course_name)
    this.exam_obv = this.loadQuiz(
      Number(this.quiz_id),
      String(this.course_name),
      String(this.quiz_name)
    );
  }

  ngOnDestroy() {

  }


  loadQuiz(quiz_id: number, course_name: string, quiz_name: string) {
    return this.quizService
      .getQuizViaId(
        (quiz_id = quiz_id),
        (course_name = course_name),
        (quiz_name = quiz_name)
      ).pipe(map(res=> {
        console.log(res)
        return res.code == 200?res.data:null;
      }))
  }


  onSelect(question: Question, option: Option) {
    //if qs is radio button
    if (question.question_type === 1) {
      question.options.forEach((x: any) => {
        if (x.id !== option.id) x.selected = false;
        else x.selected = true;
      });

      question.answered = true;
    }
    //id qs is checkbox
    if (question.question_type === 0) {
      var isAnswer = question.options.filter(
        (option: Option) => option.selected == true
      );

      if (isAnswer.length > 0) {
        question.answered = true;
      } else {
        question.answered = false;
      }
    }

    //if question is answered then change color of question
    var q = document.getElementById(`question_${question.id}`);
    if (question.answered) {
      (q as HTMLInputElement).style.backgroundColor = '#17a2b8';
    } else {
      (q as HTMLInputElement).style.backgroundColor = '#e6e4e466';
    }

    // if (this.config.autoMove) {
    //   this.goTo(this.pager.index + 1);
    // }
  }

  // goTo(index: number) {
  //   if (index >= 0 && index < this.pager.count) {
  //     this.pager.index = index;
  //     this.mode = 'quiz';
  //   }
  // }

  submit_exam(){





  }

  // submit_exam_commit() {

  //   let sub = this.quizService
  //     .addExam(this.exam.practice_part.host, this.exam.multichoice.quiz, this.course_name, this.quiz_name)
  //     .pipe(first())
  //     .subscribe({
  //       next: (data: any) => {
  //         Swal.fire({
  //           title:
  //             'Bài thi đã được hoàn thành. Vui lòng đợi đến thời điểm xem kết quả !!!',
  //           showClass: {
  //             popup: 'animate__animated animate__fadeInDown',
  //           },
  //           hideClass: {
  //             popup: 'animate__animated animate__fadeOutUp',
  //           },
  //         });
  //         //this.router.navigateByUrl(`/exam_history/${data.data}`);
  //         this.router.navigateByUrl('/');
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.error(err);
  //       },
  //     });

  //   this.subscription.add(sub);
  // }

  // saveStatus() {
  //   this.quizService.Quiz = this.exam.multichoice.quiz;
  // }

  //trackByFunction
  trackByFunction(index: number, item: any) {
    return item.id;
  }

  //for scroll (animation)
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    var btn = document.getElementById('button');
    //alert(window.pageYOffset)
    if (window.pageYOffset > 100) {
      (btn as HTMLInputElement).classList.add('show');
      (
        btn as HTMLInputElement
      ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
    </svg>`;
    } else {
      (btn as HTMLInputElement).classList.remove('show');
    }
  }

  scrollUpToTop() {
    document.getElementById('wrapper')?.scrollIntoView({ behavior: 'smooth' });
  }
  ScrollToCodingExam() {
    document
      .getElementById('codingExam')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  ScrollToSpecificSentence(sentence: number) {
    document
      .getElementById(`${sentence}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  changeTab(name: string) {
    this.mode.is_multichoice_mode = name === 'multichoice' ? true : false;
  }
}
