import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/pages/HomePages/_model/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  @Input('course_list') course_list: Course[] = [];

  slideConfig = { slidesToShow: 5, slidesToScroll: 1 };

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.responsive();
  }

  trackByFunction(index: number, item: any) {
    return item.id;
  }

  responsive() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
      ])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this.slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
        }
        if (state.breakpoints[Breakpoints.Small]) {
          this.slideConfig = { slidesToShow: 2, slidesToScroll: 1 };
        }
        if (state.breakpoints[Breakpoints.Medium]) {
          this.slideConfig = { slidesToShow: 3, slidesToScroll: 1 };
        }
        if (state.breakpoints[Breakpoints.Large]) {
          this.slideConfig = { slidesToShow: 4, slidesToScroll: 1 };
        }
        if (this.breakpointObserver.isMatched('(min-width: 1600px)')) {
          this.slideConfig = { slidesToShow: 5, slidesToScroll: 1 };
        }
      });
  }
}
