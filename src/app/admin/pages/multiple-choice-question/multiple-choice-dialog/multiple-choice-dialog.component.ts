import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-multiple-choice-dialog',
  templateUrl: './multiple-choice-dialog.component.html',
  styleUrls: ['./multiple-choice-dialog.component.scss']
})
export class MultipleChoiceDialogComponent implements OnInit {
  action: string;
  quesformdata: any;
  fg: FormGroup;
  dataArray: any;
  @ViewChild('answer') answer!: AnswerComponent
  ch: any[]

  constructor(public dialogRef: MatDialogRef<MultipleChoiceDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
      this.action = this.data.action;
      this.quesformdata = this.data.data;
      this.fg = fb.group({
        id_de_trac_nghiem: [null],
        ten_cau_hoi: new FormControl( this.quesformdata.ten_cau_hoi, [Validators.required]),
        mo_ta: new FormControl( this.quesformdata.mo_ta, [Validators.required]),
        loai_cau_hoi: new FormControl( this.quesformdata.loai_cau_hoi, [Validators.required])
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


