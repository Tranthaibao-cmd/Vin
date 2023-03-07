import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-previlege-dialog',
  templateUrl: './previlege-dialog.component.html',
  styleUrls: ['./previlege-dialog.component.scss']
})
export class PrevilegeDialogComponent implements OnInit {
  Action: string;
  privilegeformdata: any;
  fg: FormGroup;

  constructor(public dialogRef: MatDialogRef<PrevilegeDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) {
      this.Action = this.data.Action;
      this.privilegeformdata = this.data.data;
      this.fg = fb.group({
        name: new FormControl( this.privilegeformdata.name, [Validators.required]),
        action: new FormControl( this.privilegeformdata.action, [Validators.required])
      })
    }

  ngOnInit(): void {
  }

  doAction(){
    this.dialogRef.close({action: this.Action, data: this.fg.value})
  }

  closeDialog(){
    this.dialogRef.close({ event:'Hủy Bỏ' })
  }
}
