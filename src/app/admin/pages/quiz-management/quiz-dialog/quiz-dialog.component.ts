import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-dialog',
  templateUrl: './quiz-dialog.component.html',
  styleUrls: ['./quiz-dialog.component.scss']
})
export class QuizDialogComponent implements OnInit {
  action: string;
  quizformdata: any;
  fg: FormGroup;

  constructor(public dialogRef: MatDialogRef<QuizDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) {
      this.action = this.data.action;
      this.quizformdata = this.data.data;
      this.fg = fb.group({
        id_mon_hoc: [null],
        loai_de_thi: new FormControl( this.quizformdata.loai_de_thi, [Validators.required]),
        ten_de_thi: new FormControl( this.quizformdata.ten_de_thi, [Validators.required])
      })
    }

  ngOnInit(): void {}
  
  doAction(){
    this.dialogRef.close({action: this.action, data: this.fg.value})
  }

  closeDialog(){
    this.dialogRef.close({ event:'Hủy Bỏ' })
  }
}
