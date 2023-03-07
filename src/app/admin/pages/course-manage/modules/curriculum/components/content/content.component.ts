import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Content } from '../../models/content';

import { CurriculumService } from '../../services/curriculum.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  @Input('order') order: number = 0;
  @Input('content') content: Content;
  @Output("content-change") contentEmitChange = new EventEmitter()

  isEdit = false
  contentUsedToEdit:Content

  DetailsObserable:Observable<any>
  expandMorePress = false;
  constructor(private curriculumService: CurriculumService) {}

  ngOnInit() {}

  openContentDetails() {
    this.DetailsObserable = this.content.type_status == 0?this.getVideoAndFileResourses():this.DetailsObserable ;
    this.expandMorePress = true;
  }

  getVideoAndFileResourses() {
    //lazy get video and file resourse
    return this.curriculumService
      .getAllResourseViaContentId(this.content.id)
  }
  deleteContent(){
    //show swal to user
    this.curriculumService.deleteContent(this.content.id).subscribe()
    this.contentEmitChange.emit({data:{contentId:this.content.id},action:"delete"})
  }

  editContent(){
    this.isEdit = true
    //copy from this.content
    this.contentUsedToEdit = JSON.parse(JSON.stringify(this.content))

  }

  updateContent(event:{status:number,data:Content}){
    this.isEdit =  false

    if(event.status == 1)
      this.curriculumService.updateContent(event.data.id,event.data).subscribe(content_id=>{
        this.contentEmitChange.emit({data:{contentId:content_id,bodyUpdate:event.data},action:"update"})
      })
  }
}
