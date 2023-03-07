import { TopicManagementService } from '@admin/core/service/topic-management.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';
import { Resourse } from '../../models/resourse';
@Component({
  selector: 'app-topic-management-dialog',
  templateUrl: './topic-management-dialog.component.html',
  styleUrls: ['./topic-management-dialog.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class TopicManagementDialogComponent implements OnInit {
  action:string
  diolog_data:Resourse;

  title: string;
  public ResourseFormGroup: FormGroup;
  selected_icon: any;
  public ResourseAttributes = {
    display_name: ['', Validators.required],
    icon: ['', Validators.required],
    link: ['', Validators.required],
    des: [''],
  };
  public iconData = [
    { name: 'Đánh giá', value: 'thumb_up' },
    { name: 'Tài liệu', value: 'library_books' },
    { name: 'Thực hành', value: 'laptop_chromebook' },
    { name: 'Link tài liệu', value: 'insert_link' },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data_receive: { action: string; data: Resourse },
    public dialogRef: MatDialogRef<TopicManagementDialogComponent>,
    private fb: FormBuilder,
    private topicService: TopicManagementService
  ) {
    //default
    this.action =this.data_receive.action;
    this.diolog_data = this.data_receive.data;
    this.title =
      this.action == 'add'
        ? 'Thêm mới tài liệu'
        : 'Cập nhật buổi học';
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.selected_icon = this.iconData[1];

    this.ResourseFormGroup = this.fb.group(this.ResourseAttributes);
    if (this.data_receive.action == 'edit') {
      this.ResourseFormGroup.patchValue(this.diolog_data);
      //get icon that selected
      this.selected_icon = this.iconData.find(obj=> obj.name == this.diolog_data.icon.name)
    }



    // arr = [];
    // this.data.file.forEach((item: any) => {
    //   arr.push(
    //     this.fb.group({

    //       name: [item?.name, Validators.required],
    //       link: [item?.link, Validators.required],
    //       file_name: [item?.file_name, Validators.required],
    //       icon: [item?.icon, Validators.required],
    //     })
    //   );
    // });

    // this.topicForm = this.fb.group({
    //   tieu_de: [this.data.isAdd ? '' : this.data.tieu_de, Validators.required],
    //   mo_ta: [this.data.isAdd ? '' : this.data.mo_ta, Validators.required],
    //   file: this.fb.array(arr, Validators.required),
    // });
  }
  get FormControls(): any {
    return this.ResourseFormGroup.controls;
  }

  get FormValue(): any {
    return this.ResourseFormGroup.value;
  }

  onUploadedFile(event: any) {
    let selectedFile = <File>event.target.files[0];

    let formData = new FormData();
    formData.append('uploaded_file', selectedFile);
    // console.log(this.files.controls)
    this.topicService.uploadFile(formData).subscribe((link) => {
      this.ResourseFormGroup.patchValue({
        display_name: selectedFile?.name,
        link: link,
      });
    });
  }
  addFile() {
    // this.files.push(this.fb.group(this.ResourseFormGroup));
  }
  deleteFile(fileIndex: number) {
    // this.files.removeAt(fileIndex);
  }

  trackByFn(index: number, item: any) {
    return index;
  }
  // getIconName(value: string) {
  //   return this.iconData.find((i) => i.value == value)?.name;
  // }
  showData() {}
  submit() {
    let patch_data = this.action == 'edit' ? {
      icon: this.selected_icon
    }:
    {
      icon: this.selected_icon,
      id: Date.now(),
    }

    this.ResourseFormGroup.markAllAsTouched();
    this.ResourseFormGroup.patchValue(patch_data);

    let back_data = {action: this.action,data:this.FormValue}

    if (this.ResourseFormGroup.valid) this.dialogRef.close(back_data);
  }
  cancel() {
    this.dialogRef.close();
  }
}
