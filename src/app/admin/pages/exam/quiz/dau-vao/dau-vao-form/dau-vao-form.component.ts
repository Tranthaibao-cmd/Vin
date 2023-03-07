import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-dau-vao-form',
  templateUrl: './dau-vao-form.component.html',
  styleUrls: ['dau-vao-form.component.scss'],
})
export class DauVaoFormComponent {
  is_edit! : boolean
  fg: FormGroup;
  options :string[] = ['string','integer','float','boolean','array[any]','array[string]','array[integer]','array[float]','array[boolean]']
  constructor(
    public dialogRef: MatDialogRef<DauVaoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.fg = this.fb.group({
      ten_dau_vao: new FormControl(data.data.ten_dau_vao, [Validators.required,Validators.pattern(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/)]),
      kieu_du_lieu: new FormControl(data.data.kieu_du_lieu, [Validators.required]),
    });
    this.is_edit = data.is_edit
  }

  
  public checkError = (controlName:string,errorName:string)=>{
    return this.fg.controls[controlName].hasError(errorName);
  }

  InsertData(){
    if(this.fg.valid) this.dialogRef.close({data:this.fg.value,method:'add'})
  }
  UpdateData(){
    if(this.fg.valid) this.dialogRef.close({data:this.fg.value,index:this.data.index})
  }
  
}

