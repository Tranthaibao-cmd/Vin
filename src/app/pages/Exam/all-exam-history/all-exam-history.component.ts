import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizesService } from '../_services/quizes.service';

@Component({
  selector: 'app-all-exam-history',
  templateUrl: './all-exam-history.component.html',
  styleUrls: ['./all-exam-history.component.scss'],
})
export class AllExamHistoryComponent implements OnInit {
  contentLoaded = false;

  object_id: any;

  user_name: string = 'user-name';

  dataSource = new MatTableDataSource<any>();

  allExamHistory: Observable<any> = new Observable<any>();

  displayedColumns: string[] = ['Số thứ tự', 'Tên', 'Điểm', 'Hoạt động'];
  constructor(
    private QuizService: QuizesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.object_id = this.route.snapshot.paramMap.get('object_id');
  }

  @ViewChild('paginator') paginator: any;

  ngOnInit() {
    this.onGetAllExamHistory(this.object_id);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onGetAllExamHistory(object_id: string) {
    this.allExamHistory = this.QuizService.getAllExamHistory(object_id).pipe(
      map((data) => {
        this.contentLoaded = true;
        this.dataSource.data = data.data.exam_history;
        this.user_name = data.data.user_name;
        return data.data.quiz_name;
      })
    );
  }

  ViewHistory(is_quiz: boolean) {
    if (is_quiz) {
      this.router.navigateByUrl(`multichoice-exam-history/${this.object_id}`);
    } else {
      this.router.navigateByUrl(`my-coding-exam-history/${this.object_id}`);
    }
  }
}
