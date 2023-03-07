import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-user-dialog',
  templateUrl: './import-user-dialog.component.html',
  styleUrls: ['./import-user-dialog.component.scss']
})
export class ImportUserDialogComponent implements OnInit {
  action: string;
  fg: FormGroup;
  fileName: any;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  
  constructor(public dialogRef: MatDialogRef<ImportUserDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder) { 
      this.action = this.data.action;
      this.fg = fb.group({
        File: [null],
      })
    }

  ngOnInit(): void {}
  
  uploadUserFile(event: any) {
    const file = (event.target as HTMLInputElement).files;
    this.fg.patchValue({
      File: file,
    });
    this.fg.get('File').updateValueAndValidity()
  }

  doAction(){
    
    this.dialogRef.close({action: this.action, data: this.fg.value})
  }

  closeDialog(){
    this.dialogRef.close({ event:'Hủy Bỏ' })
  }
}
