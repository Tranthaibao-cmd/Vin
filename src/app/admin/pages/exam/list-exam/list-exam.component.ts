import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { CreateExamComponent } from '../create-exam/create-exam.component';
import { KyThiService } from './kythi.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-exam',
  templateUrl: './list-exam.component.html',
  styleUrls: ['./list-exam.component.scss'],
})
export class ListExamComponent implements OnInit, OnDestroy {
  contentLoaded = false;
  data_global: any;
  kyThiObservale: Observable<any> = new Observable<any>();
  course_id: any;
  course_name!: string;
  is_modal_popup = false;
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = [
    'Số thứ tự',
    'Tên',
    'Thời điểm bắt đầu kỳ thi',
    'Thời điểm kết thúc kỳ thi',
    'Thời gian làm bài',
    'Hoạt động',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild('paginator') paginator: any;
  @ViewChild('createExamComponent') createExamComponent: any;

  //all config about snack bar
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  config = new MatSnackBarConfig();

  constructor(
    private KiThiService: KyThiService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {
    this.data_global = JSON.parse(localStorage.getItem('DATA_GLOBAL')!);
    //snackbar config
    this.config.verticalPosition = this.verticalPosition;
    this.config.horizontalPosition = this.horizontalPosition;
    this.config.duration = 2500;
    this.config.panelClass = ['green-snackbar'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.course_id = this.getCourse();
    this.course_name = this.getCourseName();
    this.kyThiObservale = this.getAllKyThi(this.course_id);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getCourse() {
    let course_id = this.route.snapshot.paramMap.get('course_id');
    return course_id;
  }
  getAllKyThi(course_id: any) {
    return this.KiThiService.getAllKyThiViaCourse(course_id).pipe(
      map((data) => {
        this.contentLoaded = true;
        this.dataSource.data = data;
        return data;
      })
    );
  }

  filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
  edit(element: any) {
    element['func'] = 'edit';
    element.tg_bat_dau = new Date(element.tg_bat_dau * 1000);
    element.tg_ket_thuc = new Date(element.tg_ket_thuc * 1000);
    this.open_dialog(element);
  }

  add() {
    let data = {
      func: 'add',
      ma_course: this.course_id,
      ten_ky_thi: '',
      tg_bat_dau: '',
      tg_ket_thuc: '',
      thoi_gian_lam_bai: '',
    };
    this.open_dialog(data);
  }

  deleteKyThi(id: any) {
    let isConfirm = confirm('Bạn có chắc chắn muốn xóa đề thi này');
    if (!isConfirm) return;
    this.KiThiService.deleteKyThi(id)
      .pipe(first())
      .subscribe((data) => {
        this.ngOnInit();
        this._snackbar.open('Xóa thành công !!!', undefined, this.config);
      });
  }

  open_dialog(data_shared: any) {
    const dialogRef = this.dialog.open(CreateExamComponent, {
      width: '450px',
      data: data_shared,
    });

    dialogRef.afterClosed().subscribe((method_name: string) => {
      if (method_name) {
        this.ngOnInit();
        if (method_name == 'add')
          this._snackbar.open('Thêm thành công', undefined, this.config);
        else this._snackbar.open('Cập nhật thành công', undefined, this.config);
      }
    });
  }
  getCourseName() {
    return this.data_global.khoa_hoc.course_name;
  }
  CauHoi(element: any) {
    this.data_global['de_thi'] = { id: element.id, name: element.ten_ky_thi };
    localStorage.setItem('DATA_GLOBAL', JSON.stringify(this.data_global));
    this.router.navigateByUrl(`/admin/cau-hoi?id_de_thi=${element.id}`);
  }
}
