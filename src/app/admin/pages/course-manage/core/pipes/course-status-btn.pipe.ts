import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'course_status_btn',
})
export class CourseStatusBtnPipe implements PipeTransform {
  transform(
    status: number,
    roleId: number,
    userId: string,
    courseInstructorId: string
  ) {
    if (roleId == 0) {
      if (userId == courseInstructorId && status == 1) {
        return 'Công khai khóa học';
      }
      if (status == 2) {
        return 'Duyệt khóa học';
      }
      if(status == 3){
        return "Khóa khóa học"
      }
      return null
    } else if (roleId == 1) {
      // default the course is of user
      if (userId == courseInstructorId ) {
        if(status == 1)
          return 'Gửi để đợi duyệt';
        else if(status == 2) return "Chờ duyệt"
        else if(status == 3) return "Khóa để chỉnh sửa"
        else return null
      }
      else return null


    }
    else
      return null
  }
}
