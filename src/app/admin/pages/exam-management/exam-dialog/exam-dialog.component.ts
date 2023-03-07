import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClassManagementService } from '@admin/core/service/class-management.service';

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.scss']
})
export class ExamDialogComponent implements OnInit {
  action: string;
  examformdata: any = [];
  fg: FormGroup;
  Time: Date = new Date()

  constructor(public dialogRef: MatDialogRef<ExamDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) 
    public data: any, 
    fb: FormBuilder,
    private classes: ClassManagementService) {
      this.action = this.data.action;
      this.examformdata = this.data.data;
      this.fg = fb.group({
        id_lop: [null],
        loai_bai_thi: new FormControl( this.examformdata.loai_bai_thi, [Validators.required]),
        ten_bai_thi: new FormControl( this.examformdata.ten_bai_thi, [Validators.required]),
        mo_ta: new FormControl( this.examformdata.mo_ta ),
        thoi_gian_bat_dau: new FormControl( this.Time.toISOString().split("T")[0], [Validators.required]),
        thoi_gian_ket_thuc: new FormControl( this.Time.toISOString().split("T")[0], [Validators.required])
      })
    }

  filteredOptions: Observable<any[]>;
  options: any[];

  listClass(){
    this.classes.getClassList().subscribe((data)=>{
      this.options=data.map((item: any)=>{
        return {
          id: item._id,
          ten: item.ten_lop
        }
      });
      this.filteredOptions = this.fg.controls.loai_bai_thi.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    })
  }
  changeOption(id_lop:any)
  {
    this.fg.patchValue({
      id_lop: id_lop
    })
  }

  ngOnInit(): void {
    this.listClass()
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.ten.toLowerCase().includes(filterValue))
  }

  doAction(){
    this.dialogRef.close({action: this.action, data: this.fg.value})
  }

  closeDialog(){
    this.dialogRef.close({ event:'Hủy Bỏ' })
  }
}
