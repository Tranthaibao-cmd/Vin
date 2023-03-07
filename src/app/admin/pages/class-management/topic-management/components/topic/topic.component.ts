import { TopicManagementService } from '@admin/core/service/topic-management.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Resourse } from '../../models/resourse';
import { TopicManagementDialogComponent } from '../topic-management-dialog/topic-management-dialog.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  TopicFormGroup: FormGroup;
  resourse_list: Array<Resourse> = [];
  @Output('topicChange') topicChange = new EventEmitter();
  @Input('action') action: string = 'add';
  @Input('form-attributes') topicAttributes = {
    tieu_de: ['', Validators.required],
    mo_ta: [''],
    order: ['', Validators.required],
    file: [''],
  };
  constructor(
    private fb: FormBuilder,
    private topicService: TopicManagementService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.topicAttributes)
    this.TopicFormGroup = this.createForm(this.topicAttributes);

    //get resourse list from form
    this.resourse_list =
      this.TopicFormValue.file == ''
        ? this.resourse_list
        : this.TopicFormValue.file;
  }

  createForm(attributes: any) {
    return this.fb.group(attributes);
  }
  get TopicFormControl() {
    return this.TopicFormGroup.controls;
  }

  get TopicFormValue() {
    return this.TopicFormGroup.value;
  }

  openDialog(send_data: any) {
    let dialogRef = this.dialog.open(TopicManagementDialogComponent, {
      width: '1000px',
      data: send_data,
    });
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((result: { action: string; data: Resourse }) => {
        if (result.action == 'add') {
          this.resourse_list.push(result.data);
          // result.file = result?.file.map((r: any) => {
          //   return {
          //     name: r?.name,
          //     link: r?.link,
          //     icon: r?.icon,
          //     file_name: r?.file_name,
          //   };
          // });

          // this.data_list.push(result);

          // this.topicService
          //   .upsert(this.class_id, this.data_list)
          //   .subscribe((res) => {
          //     Swal.fire({
          //       title: 'Thêm buổi học thành công!',
          //       icon: 'success',
          //       timer: 3000,
          //       showConfirmButton: true,
          //     });
          //   });
        } else {
          let r = this.resourse_list.find((r) => r.id == result.data.id);
          let index = this.resourse_list.indexOf(r);
          let new_data = result.data;
          this.resourse_list[index] = { ...r, ...new_data };
        }
      });
  }
  addResourse() {
    const send_data = {
      action: 'add',
    };

    this.openDialog(send_data);
  }

  editResourse(resourse: Resourse) {
    const send_data = {
      action: 'edit',
      data: resourse,
    };
    this.openDialog(send_data);

    // let dialogRef = this.dialog.open(TopicManagementDialogComponent, {
    //   data: send_data,
    // });
    // dialogRef
    //   .afterClosed()
    //   .pipe(first())
    //   .subscribe((result) => {
    //     if (result) {
    //       result.file = result.file.map((r: any) => {
    //         return {
    //           name: r?.name,
    //           link: r?.link,
    //           icon: r?.icon,
    //           file_name: r?.file_name,
    //         };
    //       });
    //       this.data_list[index] = result;
    //       this.topicService
    //         .upsert(this.class_id, this.data_list)
    //         .subscribe((res) => {
    //           Swal.fire({
    //             title: 'Sửa buổi học thành công!',
    //             icon: 'success',
    //             timer: 3000,
    //             showConfirmButton: true,
    //           });
    //         });
    //     }
    //   });
  }
  // deleteDialog(index: number) {
  //   this.data_list.splice(index, 1);
  //   this.topicService.upsert(this.class_id, this.data_list).subscribe((res) => {
  //     Swal.fire({
  //       title: 'Xóa buổi học thành công!',
  //       icon: 'success',
  //       timer: 3000,
  //       showConfirmButton: true,
  //     });
  //   });
  // }

  trackById(index: number, item: any): any {
    return item.id;
  }

  deleteResourse(resourse: Resourse): void {
    const index = this.resourse_list.indexOf(resourse);
    this.resourse_list.splice(index, 1);
  }

  refreshTopicForm() {
    this.TopicFormGroup.patchValue({
      tieu_de: '',
      mo_ta: '',
    });

    this.resourse_list = [];
  }

  addTopic() {
    //patch resourse value to file in form
    this.TopicFormGroup.patchValue({ file: this.resourse_list });
    this.topicChange.emit({
      action: this.action,
      topic_data: this.TopicFormValue,
    });

    this.refreshTopicForm();
  }
}
