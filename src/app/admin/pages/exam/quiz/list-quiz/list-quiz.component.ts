import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { QuizCreateComponent } from '../create-quiz/quiz-create.component';
import {
  DauVao,
  DauVaoTableComponent,
} from '../dau-vao/dau-vao-table/dau-vao-table.component';
import { QuizCreateService } from '../quiz.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss'],
})
export class ListQuizComponent implements OnInit {
  contentLoaded = false;
  data_global: any;
  list_cau_hoi_observable!: Observable<any>;
  displayedColumns: string[] = [
    'STT',
    'ten_cau_hoi',
    'mo_ta',
    'tg_thuc_thi',
    'ten_ham',
    'ds_dau_vao',
    'ds_dau_ra',
    'hoat_dong',
  ];

  dataSource = new MatTableDataSource<CauHoi>();

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatTable) mattable!: MatTable<any>;
  //snack config
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  config = new MatSnackBarConfig();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private QuizCreateService: QuizCreateService,
    private _snackbar: MatSnackBar
  ) {
    this.data_global = JSON.parse(localStorage.getItem('DATA_GLOBAL')!);
    //snack config
    this.config.verticalPosition = this.verticalPosition;
    this.config.horizontalPosition = this.horizontalPosition;
    this.config.duration = 2500;
    this.config.panelClass = ['green-snackbar'];
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    let kythiid = this.route.snapshot.queryParamMap.get('id_de_thi');
    this.list_cau_hoi_observable = this.CauHoiObservble(kythiid!);
  }
  filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
  CauHoiObservble(kythiid: string) {
    return this.QuizCreateService.GetCauHoiViaKyThi(kythiid).pipe(
      map((data) => {
        this.contentLoaded = true;
        this.dataSource.data = data;

        return data;
      })
    );
  }
  addCauHoi() {
    let data = { de_thi: this.data_global.de_thi };
    this.openDialog(data);
  }
  edit(element: any) {
    let data = { is_update: true, data: element };

    this.openDialog(data);
  }
  deleteCauHoi(cauhoi: any) {
    let is_confirm = confirm(
      `Bạn chắc chắn muốn xóa câu hỏi: ${cauhoi.ten_cau_hoi}`
    );
    if (!is_confirm) return;
    this.QuizCreateService.DeleteQuiz(cauhoi.id)
      .pipe(first())
      .subscribe((data) => {
        this.ngOnInit();
        this._snackbar.open('Xóa thành công !!!', undefined, this.config);
      });
  }
  DauVao(element: any) {
    const dialogRef = this.dialog.open(DauVaoTableComponent, {
      width: '80vw',
      data: { data: element, is_dialog: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_changed) {
        if (result.btn == 'close') {
          let is_confirm = confirm('Bạn có muốn lưu lại hay không');
          if (!is_confirm) return;
        }
        let data_update = { dau_vao: result.data };
        this.QuizCreateService.PutQuiz(element.id, data_update)
          .pipe(first())
          .subscribe((data) => {
            this.ngOnInit();
            this._snackbar.open(
              'Cập nhật thành công !!!',
              undefined,
              this.config
            );
          });
      }
    });
  }
  openDialog(data: any) {
    const dialogRef = this.dialog.open(QuizCreateComponent, {
      width: '90vw',
      height: '90vh',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.method == 'add') {
        this.QuizCreateService.InsertQuiz(result)
          .pipe(first())
          .subscribe((data) => {
            this.ngOnInit();
            this._snackbar.open('thêm thành công !!!', undefined, this.config);
          });
      } else {
        let is_confirm = confirm(
          `Bạn có chắc chắn muốn sửa câu hỏi: ${data.data.ten_cau_hoi}`
        );
        if (!is_confirm) return;
        this.QuizCreateService.PutQuiz(data.data.id, result)
          .pipe(first())
          .subscribe((data) => {
            this.ngOnInit();
            this._snackbar.open(
              'Cập nhật thành công !!!',
              undefined,
              this.config
            );
          });
      }
    });
  }
  CreateTestCase(element: any) {
    this.data_global.cauhoi = {
      cau_hoi_id: element.id,
      ten_cau_hoi: element.ten_cau_hoi,
    };
    localStorage.setItem('DATA_GLOBAL', JSON.stringify(this.data_global));
    this.router.navigateByUrl(`/admin/testcase?id_cau_hoi=${element.id}`);
  }
}
export class CauHoi {
  ten_cau_hoi: string = '';
  mo_ta: string = '';
  ten_ham: string = '';
  gioi_han_thuc_thi: number = 0;
  dau_vao: Array<{ ten_dau_vao: string; kieu_du_lieu: string }> = [];
  dau_ra: { ten_dau_ra: string; kieu_du_lieu: string } = {
    ten_dau_ra: '',
    kieu_du_lieu: '',
  };
  ma_ky_thi: string = '';
  ten_ky_thi: string = '';
  trang_thai: boolean = true;
  ngay_tao: number = 0;
  constructor() {}
}
