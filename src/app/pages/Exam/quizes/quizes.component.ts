import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { first, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { Quiz } from '../../HomePages/_model/quiz';
import { QuizesService } from '../_services/quizes.service';
@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss'],
})
export class QuizesComponent implements OnInit, OnDestroy {
  Ob: Observable<any> = new Observable<any>();
  contentLoaded = false;
  user: any;

  status_code: number = 200;
  message: string = '';

  now: any;

  course_name: string = '';
  //for when refresh token so that we can get again course id of current
  course_id: any;
  displayedColumnsOfChoiceExam: string[] = [
    'Số thứ tự',
    'Trạng thái',
    'Tên',
    'Mô tả',
    'Thời điểm làm bài',
    'Thời điểm kết thúc',
    'Thời gian làm bài',
    'Hoạt động',
  ];

  dataSourceChoiceExam = new MatTableDataSource<Quiz>();

  constructor(
    private quizService: QuizesService,
    private router: Router,
    private route: ActivatedRoute,
    private AuthService: AuthenticationService
  ) {
    this.now = new Date().getTime() / 1000;
  }

  @ViewChild('paginatorChoiceExam') paginatorChoiceExam: any;

  ngOnInit() {
    this.course_id = this.route.snapshot.queryParamMap.get('course_id');
    this.onGetAllQuizes(Number(this.course_id));
    this.user = this.AuthService.userValue;
  }
  ngOnDestroy() {}

  ngAfterViewInit() {
    this.dataSourceChoiceExam.paginator = this.paginatorChoiceExam;
  }

  onGetAllQuizes(course_id: number) {
    this.Ob = this.quizService.getAllQuiz(Number(course_id)).pipe(
      map((data: any) => {
        if (data.code === 200) {
          this.contentLoaded = true;

          this.course_name = data.data.course_name;
          this.dataSourceChoiceExam.data = data.data.quiz_list;
        } else {
          this.status_code = data.code;
          this.message = data.message;
          this.router.navigateByUrl(`/error?status_code=${this.status_code}`);
        }
        return data;
      })
    );
  }

  examTest(quiz_id: number, quiz_name: string) {
    this.router.navigateByUrl(
      `course/quizzes/exam?&quiz_id=${quiz_id}&course_name=${this.course_name}&quiz_name=${quiz_name}`
    );
  }

  ViewHistory(quiz_id: number) {
    this.router.navigateByUrl(`/course/${this.course_id}/?quiz_id=${quiz_id}`);
  }

  disableBtnThi(element:any)
  {
    let permission =  this.user.id == 356
    let time_valid = element.time_open <= this.now && this.now < element.time_close
    let exam_finished = element.is_finished

    //    return permission? exam_finished : !time_valid
    return false
  }

  disableBtnXemKetQua(element:any)
  {
    let exam_finished = element.is_finished
    let time_valid = this.now < element.time_close + element.time_limit
    //return !exam_finished || !time_valid
    return false
  }

}
