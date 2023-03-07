import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { QuizesService } from '../_services/quizes.service';


@Component({
  selector: 'app-quiz-history-list',
  templateUrl: './quiz-history-list.component.html',
  styleUrls: ['./quiz-history-list.component.scss'],
})
export class QuizHistoryListComponent implements OnInit, OnDestroy {
  contentLoaded = false;
  subscription: Subscription = new Subscription();
  course_name: string = '';
  quizHistoryObservable: Observable<any> = new Observable<any>();
  //for when refresh token so that we can get again course id of current
  quiz_id: any;
  course_id: any;
  userValue:any;

  displayedColumns: string[] = [
    'Số thứ tự',
    'Tên',
    'Thời điểm bắt đầu làm bài',
    'Thời điểm kết thúc',
    'Hoạt động',
  ];

  dataSource = new MatTableDataSource<any>();

  constructor(
    private QuizService: QuizesService,
    private user: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userValue = this.user.userValue
  }

  @ViewChild('paginator') paginator: any;

  ngOnInit() {
    this.quiz_id = this.route.snapshot.queryParamMap.get('quiz_id');
    this.course_id = this.route.snapshot.paramMap.get('course_id');
    this.onGetQuizHistory(Number(this.quiz_id));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  onGetQuizHistory(quiz_id: number) {
    this.quizHistoryObservable = this.QuizService.getQuizHistory(quiz_id).pipe(
      map((quiz) => {
        this.contentLoaded = true ;
        this.dataSource.data = quiz;
        return quiz[0].quiz_name;
      })
    );
  }

  ViewDetails(object_id: string) {
    this.router.navigateByUrl(
      `exam_history/${object_id}`
    );
  }

  deleteQuiz(object_id: string) {
    let sub = this.QuizService.deleteQuiz(object_id).subscribe((data: any) => {
      if (data.code === 204) {
        this.router.navigateByUrl(`/course/quizes?course_id=${this.course_id}`);
      }
    });
    this.subscription.add(sub);
  }
}

interface QuizHistoryModel {
  started_time: number;
  user_name: string;
  score: number;
  submitted_time: number;
  quiz_name: string;
  oid: string;
}
