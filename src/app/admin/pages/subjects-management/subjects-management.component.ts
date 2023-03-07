import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ManageSubjectDialogComponent } from './manage-subject-dialog/manage-subject-dialog.component';
import { SubjectsManagementService } from '@admin/core/service/subjects-management.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { ImageService } from '@admin/core/service/image.service';

@Component({
  selector: 'app-subjects-management',
  templateUrl: './subjects-management.component.html',
  styleUrls: ['./subjects-management.component.scss']
})
export class SubjectsManagementComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();

  subject_list: Observable<any> = new Observable<any>();
  @ViewChild('paginator') paginator: any;

  displayedColumns: string[] = [
    'Số thứ tự',
    'Tên môn học',
    'Ảnh đại diện',
    'Mô tả',
    'action'
  ];
  Router: Router ;
  

  constructor(
    private subjectService: SubjectsManagementService,
    public dialog: MatDialog,
    private image:ImageService,
    private router:Router
  ) { }
  option(id:any){
    this.router.navigateByUrl(`/admin/class-management/${id}`)
  }
  quiz(id:any){
    this.router.navigateByUrl(`/admin/quiz-management/${id}`)
  }
  ngOnInit(): void {
    this.getSubjectData()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Filter(event: any){
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  getSubjectData(){
    this.subjectService.getSubjectList().subscribe((data) => {
      this.dataSource.data = data;
    })
  }

  openDialog(action: any, data: any): void {
    const dialogRef = this.dialog.open(ManageSubjectDialogComponent, {
      width: '500px',
      data: {
        action: action,
        data: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result)
        return
        const date = Date.parse(result.data.thoi_gian_tao)/1000;
      if(result.action == 'Thêm'){
        var addSubjectData = {
          "ten_mon_hoc": result.data.ten_mon_hoc,
          "anh_dai_dien": result.data.anh_dai_dien,
          "mo_ta": result.data.mo_ta,
        }
        if(result.data.anh_dai_dien){
          //console.log(result.data.anh_dai_dien)
          this.image.add(result.data.anh_dai_dien).subscribe((img_link) => {
            addSubjectData.anh_dai_dien = img_link
            this.addSubjectData(addSubjectData)
          })
        }
        else{
          this.addSubjectData(addSubjectData)
        }
      }
      else if(result.action == 'Cập Nhật'){
        var updateSubjectData ={
          "ten_mon_hoc": result.data.ten_mon_hoc,
          "anh_dai_dien": result.data.anh_dai_dien,
          "mo_ta": result.data.mo_ta,
          "thoi_gian_tao": date,
        };
        this.updateSubjectData(updateSubjectData, data._id)
        if(result.data.anh_dai_dien){
          this.image.add(result.data.anh_dai_dien).subscribe((img_link) => {
            updateSubjectData.anh_dai_dien = img_link
            this.updateSubjectData(updateSubjectData, data._id)
          });
        }
        else{
          this.updateSubjectData(updateSubjectData, data._id)
        }
      }
    })
  }

  addSubjectData(Subject: any){
    this.subjectService.addSubject(Subject).subscribe((data) => {
      Swal.fire({
        title: 'Thêm thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      this.getSubjectData()
    })
  }

  updateSubjectData(Subject: any, _id: string){
    this.subjectService.updateSubject(Subject, _id).subscribe((data) => {
      Swal.fire({
        title: 'Sửa thành công!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: true,
      });
      this.getSubjectData()
    })
  }

  deleteSubjectData(Id: string){
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
      if (result.isConfirmed){
        this.subjectService.deleteSubject(Id).subscribe(()=>{
          Swal.fire(
            'Thành công!',
            'Thông tin đã được xóa',
            'success'
          )
          this.getSubjectData()
        })
      }
    })
  }
}
