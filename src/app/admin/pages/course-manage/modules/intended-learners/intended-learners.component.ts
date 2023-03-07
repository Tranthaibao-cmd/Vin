import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routeParamFactory } from '@core/utilities/activated-route.factories';

import { Observable, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CourseCreationService } from '../../service/course-creation.service';
import { Course } from '../curriculum/models/course';

export const APP_SOME_ID = new InjectionToken<Observable<string>>(
  'stream of id from route param'
);
export const COURSE_TOKEN = new InjectionToken('course-service');
@Component({
  selector: 'app-intended-learners',
  templateUrl: './intended-learners.component.html',
  styleUrls: ['./intended-learners.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: APP_SOME_ID,
      useFactory: routeParamFactory('newCourseId'),
      deps: [ActivatedRoute],
    },
    {
      provide: COURSE_TOKEN,
      useClass: CourseCreationService,
    },
  ],
})
export class IntendedLearnersComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  courseId: string;
  isChange: boolean = false;
  whatWillLearn: string[] = [''];
  prerequisites: string[] = [''];
  courseForPeople: string[] = [''];
  pressUpdateBtn = false
  drop(event: CdkDragDrop<unknown>, arr: string[]) {
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
  }

  constructor(
    @Inject(COURSE_TOKEN)
    private courseServices: CourseCreationService,
    @Inject(APP_SOME_ID)
    private id$: Observable<string>
  ) {
    this.id$.pipe(takeUntil(this.destroy$)).subscribe((idParam) => {
      this.courseId = idParam;
      this.courseServices
        .getCourseInfor(this.courseId, 'goals')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.InitArr(data);

        });
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    if (this.isChange && !this.pressUpdateBtn) {
      //update to database
      this.updateData()
    }
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  InitArr(data: Course) {
    console.log(data)
    this.whatWillLearn =
      data.knowleages_will_learn.length != 0
        ? data.knowleages_will_learn
        : [''];
    this.prerequisites =
      data.prerequisites.length != 0 ? data.prerequisites : [''];
    this.courseForPeople =
      data.who_course_is_for.length != 0 ? data.who_course_is_for : [''];
  }

  addNewResponse(arr: Array<string>) {
    arr.push('');
    this.isChange = true;
  }

  deleteResponse(arr: Array<string>, index: number) {
    arr.splice(index, 1);
  }

  keyUpEvent(){
    this.isChange = true
  }

  updateData(){
    this.pressUpdateBtn = true
    let CourseBodyUpdate: Course = {
      knowleages_will_learn: this.whatWillLearn,
      prerequisites: this.prerequisites,
      who_course_is_for: this.courseForPeople,
    };
    this.courseServices
      .updateCourse(this.courseId, CourseBodyUpdate)
      .subscribe();
  }
}
