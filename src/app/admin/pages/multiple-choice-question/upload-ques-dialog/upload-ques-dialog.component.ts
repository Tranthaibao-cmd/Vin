import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-ques-dialog',
  templateUrl: './upload-ques-dialog.component.html',
  styleUrls: ['./upload-ques-dialog.component.scss']
})
export class UploadQuesDialogComponent implements OnInit {
  action: string;
  fg: FormGroup;
  fileName: any;
  constructor(public dialogRef: MatDialogRef<UploadQuesDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) {
      this.action = this.data.action;
      this.fg = fb.group({
        id_de_trac_nghiem: [null],
        file: [null]
      });
    }

  ngOnInit(): void {}

  uploadQuestionFile(event: any){
    const file = (event.target as HTMLInputElement).files[0];
    this.fg.patchValue({
      file: file,
    });
    this.fg.get('file').updateValueAndValidity()
  }
  
  doAction(){
    this.dialogRef.close({action: this.action, data: this.fg.value})
  }

  closeDialog(){
    this.dialogRef.close({ event:'Hủy Bỏ' })
  }
}
