import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-subject-dialog',
  templateUrl: './manage-subject-dialog.component.html',
  styleUrls: ['./manage-subject-dialog.component.scss']
})
export class ManageSubjectDialogComponent implements OnInit {
  action: string;
  subjectformdata: any;
  fg: FormGroup;
  createdTime: Date = new Date();
  constructor(public dialogRef: MatDialogRef<ManageSubjectDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) {
      this.action = this.data.action;
      this.subjectformdata = this.data.data;
      this.fg = fb.group({
        ten_mon_hoc: new FormControl( this.subjectformdata.ten_mon_hoc, [Validators.required] ),
        anh_dai_dien: [null],
        mo_ta: new FormControl( this.subjectformdata.mo_ta ),
        thoi_gian_tao: new FormControl( this.createdTime.toISOString().split("T")[0], [Validators.required])
      })
    }

  ngOnInit(): void {}
  
  doAction(){
    this.dialogRef.close({action: this.action, data: this.fg.value})
  }

  uploadFile(event:any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fg.patchValue({
      anh_dai_dien: file,
    });

    this.fg.get('anh_dai_dien').updateValueAndValidity()
  }

  closeDialog(){
    this.dialogRef.close({ event:'Hủy Bỏ' })
  }
}
