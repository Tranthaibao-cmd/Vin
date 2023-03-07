import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})



export class ChangePassComponent implements OnInit {
  hide = true;
  action: string;
  passwordFormdata: any;
  fg: FormGroup;
  constructor(public dialogRef: MatDialogRef<ChangePassComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) {
      this.action = this.data.action;
      this.passwordFormdata = this.data.data;
      this.fg = fb.group({
        password: new FormControl( '', [Validators.required] ),
        newpassword: new FormControl('', [Validators.required]),
        confirmpassword: new FormControl('', [Validators.required])
      }, {
        validator: confirmValidator('newpassword', 'confirmpassword')
      })
    }

  ngOnInit(): void {}

  get f() { return this.fg.controls; }

  doAction(){
    this.dialogRef.close({
    action: this.action, 
    data: this.fg.value})
  }

  closeDialog(){
    this.dialogRef.close({ event:'Hủy Bỏ' })
  }
}


export function confirmValidator(controlName: string, matchingControlName: string){
  return (fg: FormGroup) => {
    const control = fg.controls[controlName];
    const matchingControl = fg.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmValidator){
      return;
    }
    if(control.value !== matchingControl.value){
      matchingControl.setErrors({ confirmValidator: true });
    }else{
      matchingControl.setErrors(null)
    }
  }
}
