import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { CoursesService } from '../_services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  width: number = 210;
  @Input('img') img: string = '';
  @Input('full-name') full_name: string = '';
  @Input('course-id') course_id: number = 0;
  @Input('enroll-id') enroll_id: number = 0;
  @Input('short-name') short_name: string = '';
  @Input('start-time') start_time: number = 0;
  @Input('end-time') end_time: number = 0;
  start_date: Date = new Date(this.start_time);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    // this.breakpointObserver.observe(['(max-width:1239px)'])
    // .subscribe((result:BreakpointState)=>
    // {
    //   if(result.matches)
    //   {
    //     this.width = 200
    //   }
    //   else
    //   {
    //     this.width = 240
    //   }
    // })
  }

  goToQuizes() {
    this.courseService.Course = this.course_id;
    // this.router.navigateByUrl(`/course/quizes?course_id=${this.course_id}`);
    this.router.navigateByUrl(`/choose-exam-test?course_id=${this.course_id}`)
  }
}
