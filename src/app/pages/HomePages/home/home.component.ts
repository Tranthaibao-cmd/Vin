import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from 'src/app/pages/HomePages/_model/course';

import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { CoursesService } from '../_services/courses.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contentLoaded = false ;
  user: any = null;
  my_courses: Observable<any> = new Observable<any>();
  course_list: Course[] = [
    {
      course_id: 0,
      image_path: '../../../assets/img-courses/cv.jpg',
      full_name: 'Thị giác máy tính',
    },
    {
      course_id: 0,
      image_path: '../../../assets/img-courses/deeplearning.jpg',
      full_name: 'Học máy trong an ninh mạng',
    },
    {
      course_id: 0,
      image_path: '../../../assets/img-courses/python.png',
      full_name: 'Xử lí ngôn ngữ tự nhiên ',
    },
    {
      course_id: 0,
      image_path: '../../../assets/img-courses/cv.jpg',
      full_name: 'Học máy trong phát hiện bất thường',
    },
    {
      course_id: 0,
      image_path: '../../../assets/img-courses/deeplearning.jpg',
      full_name: 'Học sâu',
    },
    {
      course_id: 0,
      image_path: '../../../assets/img-courses/cv.jpg',
      full_name: 'Học sâu trong thị giác máy tính',
    },
    {
      course_id: 0,
      image_path: '../../../assets/img-courses/deeplearning.jpg',
      full_name: 'Học sâu trong an ninh mạng',
    },
  ];
  constructor(
    private courseService: CoursesService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.onGetUser();
    this.onGetMyCourses();

    //this.view_1450();
  }

  onGetUser() {
    this.authenticationService.getUser().subscribe((user: any) => {
      this.user = user;
    });
  }

  onGetMyCourses() {
    if (this.user !== null) {
      this.my_courses = this.courseService.getAllCourse().pipe(map(data=>
        {
          this.contentLoaded = true;
          return data;
        }));
    }
  }
}
