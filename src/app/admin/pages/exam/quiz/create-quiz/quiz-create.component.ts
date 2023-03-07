import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { QuizCreateService } from '../quiz.service';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DauVaoFormComponent } from '../dau-vao/dau-vao-form/dau-vao-form.component';
import { DauVao, DauVaoTableComponent } from '../dau-vao/dau-vao-table/dau-vao-table.component';

@Component({
  selector: 'quiz-create-exam',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.scss'],
})
export class QuizCreateComponent {
  press_add_btn = false;
  cauhoi:any ;
  dv: [];
  subcription: Subscription = new Subscription();
  fg: FormGroup;
  fg_dau_ra:FormGroup;
  options :string[] = ['string','integer','float','boolean','array[any]','array[string]','array[integer]','array[float]','array[boolean]']
  
  @ViewChild('dauvao') dauvao!:DauVaoTableComponent 

  constructor(
    public dialog: MatDialog,
    private QuizCreateService: QuizCreateService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuizCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cauhoi = this.data.data?this.data.data:'';
    this.dv = this.cauhoi.dau_vao?this.cauhoi.dau_vao:this.dv;
    this.fg = fb.group({
      ten_cau_hoi: new FormControl(this.cauhoi.ten_cau_hoi, [Validators.required]),
      mo_ta: new FormControl(this.cauhoi.mo_ta, [Validators.required]),
      gioi_han_thuc_thi: new FormControl(this.cauhoi.gioi_han_thuc_thi, [Validators.required]),
      ten_ham: new FormControl(this.cauhoi.ten_ham, [Validators.required,Validators.pattern(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/)]),
    
    });
    this.fg_dau_ra = fb.group({
      //ten_dau_ra:new FormControl('',[Validators.required]),
      kieu_du_lieu:new FormControl(this.cauhoi.kieu_du_lieu_dau_ra,[Validators.required])
    })
  }

  public checkError = (fg:FormGroup,controlName: string, errorName: string) => {
    return fg.controls[controlName].hasError(errorName);
  };

  addCauHoi()
  {
    let de_thi = {ma_ky_thi:this.data.de_thi.id,ten_ky_thi:this.data.de_thi.name}
    let dv = {dau_vao:this.dauvao.DATA}
    let dr = {kieu_du_lieu_dau_ra:this.fg_dau_ra.value.kieu_du_lieu}
    let data_inserted = {...dv,...this.fg.value,...dr,...de_thi,...{method:'add'}}
    this.dialogRef.close(data_inserted)

  }
  editCauHoi()
  {
    let dv = {dau_vao:this.dauvao.DATA}
    let dr = {kieu_du_lieu_dau_ra:this.fg_dau_ra.value.kieu_du_lieu}
    let data_inserted = {...dv,...this.fg.value,...dr,...{method:'update'}}
    this.dialogRef.close(data_inserted)
  }
}
