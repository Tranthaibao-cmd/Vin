import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'course_type'
})
export class CourseTypePipe implements PipeTransform {

    transform(value: number) {
        if(value==1){
            return "Online"
        }
        else{
          return "Offline"
        }
    }

}
