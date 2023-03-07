import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dau-vao',
  templateUrl: './form-dau-vao.component.html',
  styleUrls: ['./form-dau-vao.component.scss'],
})
export class FormDauVaoComponent {
  dauvao_daura!: {
    dau_vao: { ten_dau_vao: string; kieu_du_lieu: string; gia_tri: string }[];
    dau_ra: { kieu_du_lieu: string; gia_tri: string };
    an:boolean;
    method: string;
  };
  constructor(
    public dialogRef: MatDialogRef<FormDauVaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dauvao_daura = data;
  }
  filterType(kieu_du_lieu: string) {
    return kieu_du_lieu.trim().toLowerCase();
    
  }
  add() {
    let result = { data: this.dauvao_daura, method: 'add' };
    this.dialogRef.close(result);
  }
  update() {
    let result = { data: this.dauvao_daura, method: 'update' };
    this.dialogRef.close(result);
  }
 
}
