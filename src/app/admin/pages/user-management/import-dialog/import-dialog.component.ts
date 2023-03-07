import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent implements OnInit {
  action: string;
  fg: FormGroup;

  constructor(public dialogRef: MatDialogRef<ImportDialogComponent>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) {
      this.action = this.data.action;
      this.fg = fb.group({
        file: [null],
      })
    }

  ngOnInit(): void {
  }
  uploadInviteUserFile(event: any){
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
