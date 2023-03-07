import { CONFIG } from '@admin/pages/course-manage/shared/config';
import { Component, Input, OnInit } from '@angular/core';


import { Content } from '../../models/content';
import { ResourseFile } from '../../models/ResourseFile';
import { CurriculumService } from '../../services/curriculum.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
})
export class LectureComponent implements OnInit {

  @Input('video-resourses') videoResourse: Array<ResourseFile> =[];
  @Input('file-resourses') fileResourse: Array<ResourseFile>=[];
  @Input('description') description: string = ''
  @Input('content-id')content_id:string = ''
  @Input("course-id") course_id:string = ''

  videoUploadPress: boolean = false;
  descriptionUploadPress: boolean = false;
  resourseUploadPress: boolean = false;

  constructor(private curriculumService: CurriculumService) {}

  ngOnInit() {}

  editorClickHandler(event: any): void {
    if (event.name == 'save') {
      this.description = event.data
      let contentBodyUpdate: Content = { description: event.data };

      //update to database
      this.curriculumService
        .updateContent(this.content_id, contentBodyUpdate)
        .subscribe();
    }

    this.descriptionUploadPress = false;
  }
  cancelUploadFileHandler(name: string) {
    if (name == 'video') {
      this.videoUploadPress = false;
    } else {
      this.resourseUploadPress = false;
    }
  }

  onSelectedFile(event: any, uploadType: string) {
    let file: File = event.target.files[0];
    //if that is video upload then can not exceed 4GB

    if (
      (uploadType == 'video' && file.size < CONFIG.FILE_UPLOAD_LIMIT) ||
      uploadType == 'resourse'
    ) {
      //upload file to database
      this.curriculumService.uploadFile(file).subscribe((res) => {
        //update resourse with file
        let resourse: ResourseFile = {
          name: file.name,
          size: file.size,
          type_code: uploadType == 'video' ? 0 : 1,
          file: res.data.file,
          content_id: this.content_id,
          course_id: this.course_id,
        };
        //add resourse to database
        this.curriculumService.addResourse(resourse).subscribe(resourseId=>{
          resourse.id = resourseId
          //push to resourse array
        if(uploadType == 'video'){
          this.videoResourse.push(resourse)
          this.descriptionUploadPress  = false}
        else{
          this.fileResourse.push(resourse)
          this.resourseUploadPress = false
          }
        })


      });
    }
    this.cancelUploadFileHandler(uploadType)
  }

  trackByFn(index:number,item:any){
    return item.id;
  }

  deleteResourse(resourse_id:string,resourseList:Array<ResourseFile>){

    this.curriculumService.deleteResourse(resourse_id).subscribe(res=>{
      let resourseDeleteIndex = resourseList.findIndex(res => res.id == resourse_id)
      resourseList.splice(resourseDeleteIndex,1)
    })
  }

}
