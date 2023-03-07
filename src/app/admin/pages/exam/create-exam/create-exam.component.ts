import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { KyThiService } from '../list-exam/kythi.service';
import { ListExamComponent } from '../list-exam/list-exam.component';
@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss'],
})
export class CreateExamComponent implements OnInit {
  fg: any;
  func: any = { add: 'Tạo', edit: 'Cập nhật' };
  @Input('ten-ky-thi') tenKyThi: any = '';
  @Input('tg-bat-dau') thoiGianBatDau: any = '';
  @Input('tg-ket-thuc') thoiGianKetThuc: any = '';
  @Input('tg-lam-bai') thoiGianLamBai: any = '';
  constructor(
    private KiThiService: KyThiService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fg = this.fb.group({
      tenKyThi: [this.data.ten_ky_thi, Validators.required],
      thoiGianBatDau: [this.data.tg_bat_dau, Validators.required],
      thoiGianKetThuc: [this.data.tg_ket_thuc, Validators.compose([Validators.required,Validators.min(this.thoiGianBatDau)])],
      thoiGianLamBai: [this.data.thoi_gian_lam_bai, Validators.required],
    });
  }

  get Form() {
    return this.fg.value;
  }

  ngOnInit(): void {}

  addKyThi(btn: MatButton) {
    btn.disabled = true;
    let formValue = this.Form;

    let data_insert: any = {
      ten_ky_thi: formValue.tenKyThi,
      tg_bat_dau: new Date(formValue.thoiGianBatDau).getTime() / 1000,
      tg_ket_thuc: new Date(formValue.thoiGianKetThuc).getTime() / 1000,
      thoi_gian_lam_bai: formValue.thoiGianLamBai,
    };

    if (this.data.func == 'add') {
      data_insert['ma_course'] = this.data.ma_course;
      data_insert['trang_thai'] = true;
      this.KiThiService.InsertKyThi(data_insert).pipe(first()).subscribe((data)=>
      {
        this.dialogRef.close('add');
      });
    } else {
      this.KiThiService.updateKyThi(this.data.id, data_insert)
        .pipe(first())
        .subscribe((data)=>
        {
          this.dialogRef.close('edit');      
        });
    }
    
    
  }
  closeDialog(a:any){
    this.dialogRef.close()
  }
  
}
