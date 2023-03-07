import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SubjectsManagementService } from '@admin/core/service/subjects-management.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Course } from '@user_pages/HomePages/_model/course';
import { api_urls } from '@shared/api_url';

@Component({
  selector: 'app-manage-class-dialog',
  templateUrl: './manage-class-dialog.component.html',
  styleUrls: ['./manage-class-dialog.component.scss'],
})
export class ManageClassDialogComponent implements OnInit {
  is_img_upload = false
  img_upload :File 
  action: string;
  classformdata: any;
  fg: FormGroup;
  x: any;
  typeList =[
    {id:1, text:'Online'},
    {id:2, text:'Offline'},
  ]
  link = api_urls.LOCAL_API_URL;
  constructor(
    public dialogRef: MatDialogRef<ManageClassDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,

    fb: FormBuilder,
  ) {
    
    this.action = this.data.action;
    this.classformdata = this.data.data;
    this.fg = fb.group({
      category: new FormControl(this.classformdata.category, [
        Validators.required,
      ]),
    
      title: new FormControl(this.classformdata.title, [
        Validators.required,
      ]),
      course_type: new FormControl(String(this.classformdata.course_type), [
        Validators.required,
      ]),
      
    });
  }
  // filteredOptions: Observable<any[]>;
  // options: any[];
  //connect api class
  // list() {
  //   this.subject.getSubjectList().subscribe((data) => {
  //     this.options = data.map((iteam: any) => {
  //       return {
  //         id: iteam._id,
  //         ten: iteam.ten_mon_hoc,
  //       };
  //     });
  //     this.filteredOptions = this.fg.controls.ten_mon_hoc.valueChanges.pipe(
  //       startWith(''),
  //       map((value) => this._filter(value))
  //     );
  //   });
  // }
  // changeOption(id_mon_hoc: any) {
  //   this.fg.patchValue({
  //     id_mon_hoc: id_mon_hoc,
  //   });
  // }
  ngOnInit(): void {
    // this.list();
    
  }
  // private _filter(value: any): any[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter((option) =>
  //     option.ten.toLowerCase().includes(filterValue)
  //   );
  // }
  get FormValue() {
    return this.fg.value;
  }
  doAction() {
    let data = this.FormValue
   
    data["img"] =  this.is_img_upload ? this.img_upload : null  
    if (this.action == "Thêm" && data["img"] == null){
      alert("Ảnh chưa được nhập")
      return
    }
    this.dialogRef.close({ 
      data:data,
      action: this.action
    });
  }
  uploadFile(event: any) {
    this.is_img_upload = true
    this.img_upload = event.target.files[0];
    
  }
  
  closeDialog() {
    this.dialogRef.close({
      event: 'Hủy Bỏ',
    });
  }
}
