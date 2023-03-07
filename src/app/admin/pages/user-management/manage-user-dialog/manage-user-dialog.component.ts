import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MainUserManagementService } from '@admin/core/service/main-user-management.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClassManagementService } from '@admin/core/service/class-management.service';
import { UserManagementService } from '@admin/core/service/user-management.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-user-dialog',
  templateUrl: './manage-user-dialog.component.html',
  styleUrls: ['./manage-user-dialog.component.scss'],
})
export class ManageUserDialogComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  class_id:any
  user_id : any
  displayedColumns: string[] = [
    'Số thứ tự',
    'content_name',
    'create_at',
    'score',
  ];
  constructor(
    public dialogRef: MatDialogRef<ManageUserDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private userService: UserManagementService,
  ) {
    this.class_id = data.course_id
    this.user_id = data.data.id
    console.log("123123",this.user_id)
  }

  // gan id vs ten lop
  filteredOptions: Observable<any[]>;
  options: any[];

  // gan id vs first name vs last name
  userListObs: Observable<any[]>;
  UserOption: any[] = [];

  ngOnInit(): void {
    this.userService.getHistoryExam(this.class_id, this.user_id).subscribe((res)=>{
      this.dataSource= res.data
    })
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Hủy Bỏ' });
  }
  Filter(filter_data: any) {
    this.dataSource.filter = filter_data.target.value.trim().toLowerCase();
  }
}
