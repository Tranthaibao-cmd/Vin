import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-main-user-dialog',
  templateUrl: './manage-main-user-dialog.component.html',
  styleUrls: ['./manage-main-user-dialog.component.scss']
})
export class ManageMainUserDialogComponent implements OnInit {
  hide = true;
  action: string;
  mainUserformdata: any;
  fg: FormGroup;
  constructor(public dialogRef: MatDialogRef<ManageMainUserDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) {
      this.action = this.data.action;
      this.mainUserformdata = this.data.data;
      this.fg = fb.group({
        first_name: new FormControl( this.mainUserformdata?.first_name, [Validators.required]),
        last_name: new FormControl( this.mainUserformdata?.last_name, [Validators.required]),

        email: new FormControl( this.mainUserformdata?.email, [Validators.required]),
        password: new FormControl( this.mainUserformdata?.password, [Validators.required]),
      })
    }

  ngOnInit(): void {}

  doAction(){
    this.dialogRef.close({action: this.action, data: this.fg.value})
  }

  get FormControls(): any {
    return this.fg.controls;
  }

  uploadFile(event:any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fg.patchValue({
      avatar_pic: file,
    });

    this.fg.get('avatar_pic').updateValueAndValidity()
  }

  closeDialog(){
    this.dialogRef.close({ event:'Hủy Bỏ' })
  }
}
