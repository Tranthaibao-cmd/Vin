import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentType'
})
export class ContentTypePipe implements PipeTransform {

  transform(type_status: number) {
    switch(type_status) {
      case 0:
        return "Bài học"
      case 1:
        return "Bài tập trắc nghiệm"
      case 2:
        return "Bài tập coding"
      default:
        return "Bài tập AI"
    }
  }

}
