import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ManageUserDialogComponent } from './manage-user-dialog/manage-user-dialog.component';
import { UserManagementService } from '@admin/core/service/user-management.service';
import Swal from 'sweetalert2';
import { ImportDialogComponent } from './import-dialog/import-dialog.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MainUserManagementService } from '@admin/core/service/main-user-management.service';
import Utilities from '@core/utilities/utilities';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit,OnDestroy {
  user_assignment_mode = false
  users:any = []
  allUserAssign:any = []
  class_id: string;
  dataSource = new MatTableDataSource<any>();
  data_global: any;
  @ViewChild('paginator') paginator: any;
  user_list: Observable<any>;
  ten_lop: any;
  destroy$ = new Subject<boolean>();
  displayedColumns: string[] = [
    'Số thứ tự',
    'First Name',
    'Last Name',
    'Gmail',
    'action',
  ];
  constructor(
    private userService: UserManagementService,
    private mainUserService:MainUserManagementService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.data_global = JSON.parse(localStorage.getItem('DATA_GLOBAL')!);


    this.filteredStudents = this.StudentCtrl.valueChanges.pipe(
      startWith(null),
      map((user: any) => (user ? this._filter(user) : this.users.slice() )),
    );
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.class_id =  params["id"]
      this.getUserList(this.class_id);
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getUserList(id: string) {
    this.userService.getbasedId(id).subscribe((data: any) => {
      this.dataSource.data = data.data;

    });
  }


  getUserBasedID(id: string) {
    this.userService.getInviteBasedID(id).subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  getClassId() {
    this.route.params.subscribe((params) => {
      this.class_id = params['id'];
    });
  }

  getAll() {
    this.userService.getAllInvite().subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  Filter(filter_data: any) {
    this.dataSource.filter = filter_data.target.value.trim().toLowerCase();
  }

  openFileDialog(action: any, data: any) {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '900px',
      data: {
        action: action,
        data: data,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if ((result.action = 'Import')) {
        this.userService
          .importInviteUser(result.data.file[0])
          .subscribe((data) => {
            this.getAll();
          });
      }
    });
  }

  openDialog(data: any, course_id: any) {
    const dialogRef = this.dialog.open(ManageUserDialogComponent, {
      width: '900px',
      data: {
        data: data,
        course_id: this.class_id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (result.action == 'Thêm') {
        this.addUserData(
          result.data,
          this.class_id,
          result.data.id_nguoi_dung,
          result.data.first_name,
          result.data.last_name,
          result.data.quyen
        );
      } else if (result.action == 'Cập Nhật') {
        var updateUserData = {
          id_lop_hoc: this.class_id,
          quyen: result.data.quyen,
          trang_thai: result.data.trang_thai,
        };
        console.log(updateUserData);
        this.updateUserData(
          updateUserData,
          data._id,
          updateUserData.trang_thai,
          updateUserData.quyen
        );
      }
    });
  }

  addUserData(
    User: any,
    class_id: string,
    user_id: string,
    first_name: any,
    last_name: any,
    quyen: any
  ) {
    this.userService
      .addUserList(User, class_id, user_id, first_name, last_name, quyen)
      .subscribe((data) => {
        Swal.fire({
          title: 'Thêm thành công!',
          icon: 'success',
          timer: 3000,
          showConfirmButton: true,
        });
        this.getUserBasedID(this.class_id);
      });
  }

  updateUserData(User: any, _id: string, status: any, Role: any) {
    this.userService
      .updateUserList(User, _id, status, Role)
      .subscribe((data) => {
        Swal.fire({
          title: 'Sửa thành công!',
          icon: 'success',
          timer: 3000,
          showConfirmButton: true,
        });
        if (this.class_id != null) {
          this.getUserBasedID(this.class_id);
        } else {
          this.getAll();
        }
      });
  }


  AssignStudentToClass(){
    this.user_assignment_mode = true
    this.mainUserService.getMainUserList(this.class_id).subscribe((res:any) =>{
      this.users = res.data
    })

  }
  AssignUsertoCourse(){
    let learnersid = this.allUserAssign.map((user:any)=>user.id)
    this.mainUserService.AssignUserToCourse(this.class_id,learnersid).subscribe((res:any)=>{
      alert("Bạn đã thêm thành công")
      this.dataSource.data = [...this.dataSource.data,...this.allUserAssign]
      this.allUserAssign = []
      this.user_assignment_mode = false

    })
  }
  //------------------------

  separatorKeysCodes: number[] = [ENTER, COMMA];
  StudentCtrl = new FormControl('');
  filteredStudents: Observable<any>;
  emails: string[] = [];


  @ViewChild('StudentInput') StudentInput: ElementRef<HTMLInputElement>;


  add(event: MatChipInputEvent): void {
    const value = event.value;

    if (value) {
      this.allUserAssign.push(value);
    }

    // Clear the input value
    //event.chipInput!.clear();

    this.StudentCtrl.setValue(null);
  }

  remove(user: any): void {
    const index = this.allUserAssign.indexOf(user);

    if (index >= 0) {
      this.allUserAssign.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    this.allUserAssign.push(event.option.value);
    this.StudentInput.nativeElement.value = '';
    this.StudentCtrl.setValue(null);
  }

  private _filter(value: string) {

    if(typeof value != "string"){return }

    const filterValue = value.toLowerCase();

    return this.users.filter((student:any) => student.email.toLowerCase().includes(filterValue));
  }

  deleteStudentFromCourse(student_id:any){
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại dữ liệu này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    })
      .then((result) => {
        if (result.value) {
          this.userService.deleteStudentFromCourse(student_id,this.class_id).subscribe(res =>{
            alert("Xóa thành công")
            let dataSourceCopy = [...this.dataSource.data]
            let studentDelete = dataSourceCopy.findIndex((user:any)=>user.id == student_id)
            dataSourceCopy.splice(studentDelete,1)
            this.dataSource.data = dataSourceCopy
          })
        }
      })
      .catch(() => {
        return;
      });


  }

  fileUpload(event:any){
    const fileSelected = event.target.files[0];
    Utilities.convertExcelFileToJsonData(fileSelected).pipe(takeUntil(this.destroy$)).subscribe((data:Array<any>) => {
      if(data){

        let emails = data.map(e=>e.email)
        this.userService.classAssigmentViaUserEmail(this.class_id,emails).subscribe(res=>{
          alert("Thêm thành công")
          this.getUserList(this.class_id);
        })
      }
    })
  }

}
