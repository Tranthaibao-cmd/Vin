import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { QuizManagementService } from '@admin/core/service/quiz-management.service';
import { QuizDialogComponent } from './quiz-dialog/quiz-dialog.component';

@Component({
  selector: 'app-quiz-management',
  templateUrl: './quiz-management.component.html',
  styleUrls: ['./quiz-management.component.scss']
})
export class QuizManagementComponent implements OnInit {
  course_id: string;
  quiz_list: Observable<any>;
  data_global: any;
  dataSource = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator: any;

  Filter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  displayedColumns: string[] = [
    'số thứ tự',
    'loại đề thi',
    'Tên đề thi',
    'action'
  ]

  constructor(
    private quiService: QuizManagementService, 
    public dialog: MatDialog,
    private router:Router,
    private route: ActivatedRoute,) {
      this.data_global = JSON.parse(localStorage.getItem('DATA_GLOBAL')!);
      this.course_id = this.route.snapshot.paramMap.get('id')
    }

  ngOnInit(): void {
    this.getQuiz()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getSubjectID(){
    this.route.params.subscribe(params =>{
      this.course_id = params['id']
    })
  }

  Cauhoi(id: string){
    this.router.navigateByUrl(`/admin/choice-question-management/${id}`)
  }
  getQuiz(){
    this.quiService.getQuiz().subscribe((data:any) => {
      this.dataSource.data = data
    })
  }
  openDialog(action: any, data: any): void{
    const dialogRef = this.dialog.open(QuizDialogComponent, {
      width: '500px',
      data: {
        action: action,
        data: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result)
        return
      if(result.action == 'Thêm'){
        const data = result.data;
        var addquizdata = {
          "id_mon_hoc": this.course_id,
          "loai_de_thi": data.loai_de_thi,
          "ten_de_thi": data.ten_de_thi
        }
        this.addQuiz(addquizdata)
        console.log(addquizdata)
      }
      else if(result.action == 'Cập Nhật'){
        var putquizdata = {
          "id_mon_hoc": this.course_id,
          "loai_de_thi": result.data.loai_de_thi,
          "ten_de_thi": result.data.ten_de_thi
        }

        this.updateQuiz(putquizdata, data._id)
        console.log(putquizdata)
      }
    })
  }
  addQuiz(quiz: any){
    this.quiService.addQuiz(quiz).subscribe((data) => {
      Swal.fire({
        title: 'Thêm thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      console.log(data)
      this.getQuiz()
    })
  }
  updateQuiz(quiz: any, _id: any){
    this.quiService.updateQuiz(quiz, _id).subscribe((data) => {
      Swal.fire({
        title: 'Sửa thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      console.log(data)
      this.getQuiz()
    })
  }
  deleteQuiz(Id: any){
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
        this.quiService.deleteQuiz(Id).subscribe(() => {
          Swal.fire(
            'Thành công!',
            'Thông tin đã được xóa',
            'success'
          )
          this.getQuiz()
        })
      }
    })
  }
  
}
