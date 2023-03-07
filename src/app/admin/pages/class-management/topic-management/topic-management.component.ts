import { TopicManagementService } from '@admin/core/service/topic-management.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TopicManagementDialogComponent } from './components/topic-management-dialog/topic-management-dialog.component';
import {
  ToolbarService,
  LinkService,
  ImageService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';
import { Resourse } from './models/resourse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-topic-management',
  templateUrl: './topic-management.component.html',
  styleUrls: ['./topic-management.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
})
export class TopicManagementComponent implements OnInit {
  topic_list_observable: Observable<any>;
  data_list: Array<any> = [];
  public iconColor: any = {
    thumb_up: 'blueBg',
    library_books: 'redBg',
    laptop_chromebook: 'yellowBg',
  };
  public class_id: string;

  getData(i: string) {
    return this.iconColor[i];
  }
  //for edit topic
  topic_id_selected: string = null;
  @ViewChild('expanded') expanded:MatExpansionPanel
  constructor(
    public dialog: MatDialog,
    private topicService: TopicManagementService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.topic_list_observable = this.getTopicList(param.id);
      this.class_id = param.id;
    });

    //create topic form
  }

  getTopicList(id: string) {
    return this.topicService.get(id).pipe(
      map((topic_list: any[]) => {

        let topicIncludeForm = topic_list.map((topic: any) => {
          let form_att = {
            tieu_de: [topic.tieu_de, Validators.required],
            mo_ta: [topic.mo_ta],
            order: [topic.order, Validators.required],
            file: [topic.file],
          };
          return { ...topic, ...{ form_attributes: form_att } };
        });
        return topicIncludeForm;
      })
    );

  }

  deleteTopic(topic_id: string) {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa ?',
      text: "Thông tin sẽ bị xóa và không thể quay trở lại !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText:'Hủy'
    }).then((result)=>{
      if(result.isConfirmed){
        this.topicService.deleteTopic(topic_id).subscribe((res) => {
          Swal.fire(
            'Thành công!',
            'Thông tin đã được xóa',
            'success'
          )
          this.topic_list_observable = this.getTopicList(this.class_id);
        });
      }
    })
  }

  editTopic(topic_id: string) {
    this.topic_id_selected =
    this.topic_id_selected == topic_id ? null : topic_id;
  }

  addOrEditTopic(topic: { action: string; topic_data: any }) {
    let action = topic.action;

    let data = {
      ...topic.topic_data,
      ...{ ma_lop_hoc: this.class_id },
    };

    if (action == 'add') {
      this.topicService.upsert(data).subscribe((res: any) => {
        Swal.fire({
          title: 'Thêm thành công!',
          icon: 'success',
          timer: 3000,
          showConfirmButton: true,
        });
        this.topic_list_observable = this.getTopicList(this.class_id);
      });
      //close expaned
      this.expanded.close()
    } else{
      data.mo_ta= data.mo_ta == null ? '' : data.mo_ta;
      this.topicService.updateTopic(this.topic_id_selected, data).subscribe((res: any) => {
        Swal.fire({
          title: 'Sửa thành công!',
          icon: 'success',
          timer: 3000,
          showConfirmButton: true,
        });
          //console.log(res);
        this.topic_list_observable = this.getTopicList(this.class_id);
      });
      this.goToTopic(this.topic_id_selected)
    }
    this.refresh();
  }

  refresh() {
    this.topic_id_selected = null;
  }

  goToTopic(topicId: string) {
    document
      .getElementById(`${topicId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
