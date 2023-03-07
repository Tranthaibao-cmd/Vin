import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'role_name'
})
export class UseRolePipe implements PipeTransform {

    transform(value: number ) {
        switch(value){
            case 0:
                return "Admin"
            case 1:
                return 'Giáo viên'
            default:
                return "Học sinh"
        }
    }

}