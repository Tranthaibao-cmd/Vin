import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MultipleChoiceService } from '@admin/core/service/multiple-choice.service';
import { MultipleChoiceDialogComponent } from './multiple-choice-dialog/multiple-choice-dialog.component';
import { UploadQuesDialogComponent } from './upload-ques-dialog/upload-ques-dialog.component';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.scss']
})
export class MultipleChoiceQuestionComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  question_list: Observable<any>;
  public quiz_id: string;
  @ViewChild('paginator') paginator: any;

  Filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  constructor(
    private questionService: MultipleChoiceService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.question_list = this.getQuestion();
    this.getQuizId()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getQuizId(){
    this.route.params.subscribe(params =>{
      this.quiz_id = params['id']
    })
  }
  getQuestion(){
    return this.questionService.getQuestion();
  }
  openDialog(action: any, data: any): void{
    const dialogRef = this.dialog.open(MultipleChoiceDialogComponent, {
      width: '900px',
      data: {
        action: action,
        data: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result)
        return
      if(result.action == 'Thêm'){
        var add_data = {
          "id_de_trac_nghiem": this.quiz_id,
          "ten_cau_hoi": result.data.ten_cau_hoi,
          "mo_ta": result.data.mo_ta,
          "ds_cautraloi": result.data.ds_cautraloi,
          "dap_an": result.data.dap_an,
          "loai_cau_hoi": result.data.loai_cau_hoi,
        }
        this.addQuestion(add_data)
        console.log(add_data)
      }else if(result.action == 'Cập Nhật'){
        var put_data = {
          "id_de_trac_nghiem": this.quiz_id,
          "ten_cau_hoi": result.data.ten_cau_hoi,
          "mo_ta": result.data.mo_ta,
          "ds_cautraloi": result.data.ds_cautraloi,
          "dap_an": result.data.dap_an,
          "loai_cau_hoi": result.data.loai_cau_hoi,
        }
        this.updateQuestion(put_data, data._id)
        console.log(put_data, data._id)
      }
    })
  }
  openUpDialog(action: any, data: any): void{
    const dialogRef = this.dialog.open(UploadQuesDialogComponent, {
      width: '500px',
      data: {
        action: action,
        data: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result)
        return
      else if (result.action == 'Upload'){
        var upload_data = {
          "id_de_trac_nghiem": this.quiz_id,
          "file": result.data.file
        }
        console.log(upload_data)
        this.questionService.uploadQuestion(upload_data.file[0], upload_data.id_de_trac_nghiem).subscribe(data => {
          this.getQuestion()
        })
      }
    })
  }
  
  addQuestion(question: any){
    this.questionService.addQuestion(question).subscribe((data) => {
      Swal.fire({
        title: 'Thêm thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      console.log(data)
      this.getQuestion()
    })
  }
  updateQuestion(question: any, _id: any){
    this.questionService.updateQuestion(question, _id).subscribe((data) => {
      Swal.fire({
        title: 'Sửa thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      console.log(data)
      this.getQuestion()
    })
  }
  deleteQuestion(id: any){
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
        this.questionService.deleteQuestion(id).subscribe(() => {
          Swal.fire(
            'Thành công!',
            'Thông tin đã được xóa',
            'success'
          )
          this.getQuestion()
        })
      }
    })
  }
}
