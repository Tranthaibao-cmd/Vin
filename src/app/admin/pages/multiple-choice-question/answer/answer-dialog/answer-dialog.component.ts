import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.scss']
})
export class AnswerDialogComponent implements OnInit {
  is_edit! : boolean
  fg: FormGroup;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<AnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: any,
    private fb: FormBuilder
  ) {
    console.log(data)
    this.fg = this.fb.group({
      dap_an_A: new FormControl ( data.data.dap_an_A, [Validators.required] ),
      dap_an_B: new FormControl ( data.data.dap_an_B, [Validators.required] ),
      dap_an_C: new FormControl ( data.data.dap_an_C, [Validators.required] ),
      dap_an_D: new FormControl ( data.data.dap_an_D, [Validators.required] ),
    });
    this.is_edit = data.is_edit
  }

  ngOnInit(): void {
  }

  addData(){
    this.dialogRef.close({
      data: this.fg.value,
      action: 'Thêm'
    })
  }
  updateData(){
    this.dialogRef.close({
      data: this.fg.value,
      index: this.data.index
    })
  }
}
