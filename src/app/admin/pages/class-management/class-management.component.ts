import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageClassDialogComponent } from './manage-class-dialog/manage-class-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ClassManagementService } from '../../core/service/class-management.service';
import { ImageService } from '@admin/core/service/image.service';
import Swal from 'sweetalert2';
import { api_urls } from '@shared/api_url';
import { AuthenticationService } from '@core/_services/authentication.service';

@Component({
  selector: 'moodle-admin-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.scss'],
})
export class ClassManagementComponent implements OnInit {
  course_id: string;
  contentLoaded = false;
  dataSource = new MatTableDataSource<any>();
  public alert = '';
  ten_lop: any;
  data_global: any;
  link = api_urls.LOCAL_API_URL;
  class_list: Observable<any> = new Observable<any>();
  @ViewChild('paginator') paginator: any;
  displayedColumns: string[] = [
    'Tên môn học',
    'Tên lớp',
    'avatar',
    'Tên tác giả',
    'Trạng thái',
    'Trạng thái DK',
    'action',
  ];
  table: any;
  role= true
  constructor(
    private classService: ClassManagementService,
    private image: ImageService,
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.data_global = JSON.parse(localStorage.getItem('DATA_GLOBAL')!);
    this.course_id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
      this.authenticationService.getUser().subscribe(res=>{
        if(res.role_id !== 2){
          this.role = false
        }
      })
      this.getClassData();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Filter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getClassID(id: any) {
    this.classService.getClassID(id).subscribe((res: any) => {
      this.dataSource = res.data;
    });
  }
  getClassData() {
    this.classService.getClassList().subscribe((res: any) => {
      this.dataSource.data = res.data;
      console.log(this.dataSource.data)
    });
  }

  /* navigateToEditTopic(class_id:string)
    {
      this.router.navigateByUrl(`/admin/topic/${class_id}`);
    }
    linkToUser(class_id:string)
    {
      this.router.navigateByUrl(`/admin/user-management/${class_id}`);
    } */
  openDialog(action: any, data: any, id: any): void {
    const dialogRef = this.dialog.open(ManageClassDialogComponent, {
      width: '500px',
      data: {
        action: action,
        data: data,
      },
    });
    //close dialog
    dialogRef.afterClosed().subscribe((result) => {
      let courseData = result.data;
      let action = result.action;

      if (courseData.img) {
        this.classService
          .uploadFile(courseData.img, 'public')
          .subscribe((filepath) => {
            courseData['img'] = filepath.file;

            if (action == 'Thêm') {
              courseData["id"] = Date.now()
              this.classService
                .addClass(courseData)
                .subscribe((courseId: string) => {


                  this.ngOnInit();
                  //this.table.renderRows();
                });
            } else {
              this.classService.updateClass(courseData, id).subscribe((res) => {
                this.ngOnInit();
              });
              //this.classService.updateClass()
            }
          });
      } else {
        delete courseData['img'];
        //update
        this.classService.updateClass(courseData, id).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }

  deleteClassData(id: string) {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa ?',
      text: 'Thông tin sẽ bị xóa và không thể quay trở lại !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.classService.deleteClass(id).subscribe(() => {
          Swal.fire('Thành công!', 'Thông tin đã được xóa', 'success');
          if (this.course_id != null) {
            this.getClassID(this.course_id);
          } else {
            this.getClassData();
          }
        });
      }
    });
  }

  redirectToPage(page_name: string, element: any) {
    console.log("element",element)
    this.router.navigate([
      `./${page_name}/${element.id}`],{relativeTo:this.route}
    );
  }
}
