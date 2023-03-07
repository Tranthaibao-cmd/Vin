import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ExamManagementService } from '@admin/core/service/exam-management.service';
import { map } from 'rxjs/operators';
import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';

@Component({
  selector: 'app-exam-management',
  templateUrl: './exam-management.component.html',
  styleUrls: ['./exam-management.component.scss']
})
export class ExamManagementComponent implements OnInit {
  class_id: string;
  exam_list: Observable<any>;
  dataSource = new MatTableDataSource<any>();
  data_global: any;
  @ViewChild('paginator') paginator: any;

  Filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  displayedColumns: string[] = [
    'số thứ tự',/* 
    'loại bài thi', */
    'tên bài thi',
    'mô tả',
    'thời dian bắt đầu',
    'thời gian kết thúc',
    'action'
  ]

  constructor(
    private examService: ExamManagementService, 
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.data_global = JSON.parse(localStorage.getItem('DATA_GLOBAL')!);
    this.class_id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    if(this.class_id != null) {
      this.getExamList(this.class_id)
    }
    else{
      this.getAllExam()
    }
    this.getClassId()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getExamList(id: string){
    this.examService.getbasedID(id).subscribe((data: any)=>{
      this.dataSource.data = data
    })
  }
  getClassId(){
    this.route.params.subscribe(params =>{
      this.class_id = params['id']
    })
  }
  getAllExam(){
    this.examService.getAllExam().subscribe((data: any)=>{
      this.dataSource.data = data
    })
  }
  
  openDialog(action: any, data: any): void{
    const dialogRef = this.dialog.open(ExamDialogComponent, {
      width: '500px',
      data: {
        action: action,
        data: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result)
        return
        const date1 = Date.parse(result.data.thoi_gian_bat_dau)/1000;
        const date2= Date.parse(result.data.thoi_gian_ket_thuc)/1000;
      if(result.action == 'Thêm'){
        const data = result.data;
        var add_data = {
          "id_lop": this.class_id,
          "loai_bai_thi": data.loai_bai_thi,
          "ten_bai_thi": data.ten_bai_thi,
          "mo_ta": data.mo_ta,
          "thoi_gian_bat_dau": date1,
          "thoi_gian_ket_thuc": date2
        }
        this.addExam(add_data)
        console.log(add_data)
      }
      else if(result.action == 'Cập Nhật'){
        var put_data = {
          "loai_bai_thi": result.data.loai_bai_thi,
          "ten_bai_thi": result.data.ten_bai_thi,
          "mo_ta": result.data.mo_ta,
          "thoi_gian_bat_dau": date1,
          "thoi_gian_ket_thuc": date2
        }
        this.updateExam(put_data, data._id)
      }
    })
  }
  addExam(exam: any){
    this.examService.addExam(exam).subscribe((data) => {
      Swal.fire({
        title: 'Thêm thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      this.getExamList(this.class_id);
      
    })
  }
  updateExam(exam: any, _id: string){
    this.examService.updateExam(exam, _id).subscribe((data) => {
      Swal.fire({
        title: 'Sửa thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      this.getExamList(this.class_id);
    })
  }
  deleteExam(Id: any){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa ?',
      text: "Thông tin sẽ bị xóa và không thể quay trở lại !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if(result.isConfirmed){
        this.examService.deleteExam(Id).subscribe(()=>{
          Swal.fire(
            'Thành công!',
            'Thông tin đã được xóa',
            'success'
          )
          this.getExamList(this.class_id);
        })
      }
    })
  }
}
