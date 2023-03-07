import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'course_status'
})
export class CourseStatusPipe implements PipeTransform {

    transform(value: number) {
        if(value==1){
            return "Đang tạo"
        }else if(value == 2){
            return "Đang chờ duyệt"
        }else{
          return "Đã duyệt"
        }
    }

}
