import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ManageMainUserDialogComponent } from './manage-main-user-dialog/manage-main-user-dialog.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { MainUserManagementService } from '@admin/core/service/main-user-management.service';
import { ImageService } from '@admin/core/service/image.service';
import Swal from 'sweetalert2';
import { ImportUserDialogComponent } from './import-user-dialog/import-user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

import { api_urls } from '@shared/api_url';
import { UserManagementService } from '@admin/core/service/user-management.service';
import * as XLSX from 'xlsx';
import Utilities from '@core/utilities/utilities';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-main-user-management',
  templateUrl: './main-user-management.component.html',
  styleUrls: ['./main-user-management.component.scss'],
})
export class MainUserManagementComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  destroySubject = new Subject<boolean>();
  link: string = api_urls.LOCAL_API_URL;

  @ViewChild('paginator') paginator: any;
  roleList: any = [
    { id: 1, text: 'Giáo viên' },
    { id: 3, text: 'Học viên' },
  ];
  changeRole: boolean = false;
  displayedColumns: string[] = [
    'Số thứ tự',
    'firstname',
    'lastname',
    'avatar',
    'email',
    'role',
    'action',
  ];
  constructor(
    private mainUserService: MainUserManagementService,
    private userManagementService: UserManagementService,
    private image: ImageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMainUserData();
  }
  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  changeRoleUser(element: any) {
    element.isEdit = true;
  }
  onChange(newRoleValue: number, user: any) {
    this.userManagementService
      .updateUserRole(user.id, { role_id: newRoleValue })
      .subscribe((res) => {
        this.getMainUserData();
        user.isEdit = false;
      });
  }
  getMainUserData() {
    this.mainUserService.getMainUserList().subscribe((res) => {
      let userList = res.data;
      //add edit field in every user
      userList.forEach((user: any, index: number) => {
        user.isEdit = false;
      });

      this.dataSource.data = userList;
    });
  }

  Filter(filter_data: any) {
    this.dataSource.filter = filter_data.target.value.trim().toLowerCase();
  }

  openFileDialog(action: any, data: any) {
    const dialogRef = this.dialog.open(ImportUserDialogComponent, {
      width: '500px',
      data: {
        action: action,
        data: data,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if ((result.action = 'Import')) {
        this.mainUserService
          .addFileUser(result.data.File[0])
          .subscribe((data) => {
            this.getMainUserData();
          });
      }
    });
  }

  openDialog(action: any, data: any) {
    const dialogRef = this.dialog.open(ManageMainUserDialogComponent, {
      width: '500px',
      height: 'auto',
      data: {
        action: action,
        data: data,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (result.action == 'Thêm') {
        var add_data = {
          first_name: result.data.first_name,
          last_name: result.data.last_name,
          email: result.data.email,
          password: result.data.password,
        };
        this.mainUserService.addNewUser(add_data).subscribe((result) => {
          alert('Thêm thành công');
          this.ngOnInit();
        });
      } else if (result.action == 'Cập Nhật') {
        var put_data = {
          first_name: result.data.first_name,
          last_name: result.data.last_name,
          email: result.data.email,
        };
      }
    });
  }

  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    Utilities.convertExcelFileToJsonData(selectedFile)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((data: any) => {
        if (data) {
          this.mainUserService
            .importUserDataFromExcel(data)
            .subscribe((res) => {
              alert('Import thành công');
              this.ngOnInit();
            });
        }
      });
  }

  deleteUser(userId: string) {
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
          this.mainUserService.deleteMainUser(userId).subscribe((res) => {
            let users = this.dataSource.data;
            let index = users.findIndex((x) => x.id == userId);
            users.splice(index, 1);
            this.dataSource.data = users;
            alert('Xóa thành công');
          });
        }
      })
      .catch(() => {
        return;
      });
  }
}
