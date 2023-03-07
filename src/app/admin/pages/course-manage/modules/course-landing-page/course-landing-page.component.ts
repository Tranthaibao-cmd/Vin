import { CourseService } from '@admin/pages/course/services/course.service';
import {
  Component,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { routeParamFactory } from '@core/utilities/activated-route.factories';
import { AuthenticationService } from '@core/_services/authentication.service';
import { api_urls } from '@shared/api_url';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CourseCreationService } from '../../service/course-creation.service';
import { Course } from '../curriculum/models/course';
import { CurriculumService } from '../curriculum/services/curriculum.service';

const APP_SOME_ID = new InjectionToken<Observable<string>>('stream id');
@Component({
  selector: 'app-course-landing-page',
  templateUrl: './course-landing-page.component.html',
  styleUrls: ['./course-landing-page.component.scss'],
  providers: [
    {
      provide: APP_SOME_ID,
      useFactory: routeParamFactory('newCourseId'),
      deps: [ActivatedRoute],
    },
    CourseCreationService,
    CurriculumService,
    CourseService
  ],
})
export class CourseLandingPageComponent implements OnInit, OnDestroy {
  //make this variable for event detect change of form
  pressUpdateBtn = false;
  changeFormNumber: number = 0;
  isChange: boolean = false;
  getCourseInforMode: string = 'course-landing-page';
  destroy$ = new Subject<boolean>();
  img: string;
  imgName: string;
  courseId: string;
  formGroup: FormGroup;
  error: boolean;
  user: any;
  link = api_urls.LOCAL_API_URL
  attributes = {
    title: new FormControl(''),
    teaching_language: new FormControl('tiếng việt'),
    description: new FormControl(''),
    category: new FormControl(''),
  };

  teachingLanguage: Array<string> = ['tiếng anh', 'tiếng việt', 'khác'];
  course_categories:any = [

  ];
  constructor(
    @Inject(APP_SOME_ID) private id$: Observable<string>,
    private fb: FormBuilder,
    private courseService: CourseCreationService,
    private curriculumService: CurriculumService,
    private authService: AuthenticationService,
    private coursesService: CourseService,
  ) {}

  ngOnInit(): void {
    //initialize form group
    this.formGroup = this.fb.group(this.attributes);
    //get course id
    this.id$
      .pipe(takeUntil(this.destroy$))
      .subscribe((courseId) => (this.courseId = courseId));
    //get information
    this.getCourseInfor();
    //trace changing of form
    this.formGroup.valueChanges.subscribe((rel) => {
      //when subscribe we will get a result but form have changed Nothing
      //so if number >0 mean that form have changed
      if (this.changeFormNumber > 0) this.isChange = true;
      this.changeFormNumber += 1;
    });
    this.authService.getUser().subscribe((res) => {
      this.user = res;
      if (
        this.user.avatar_pic != '' &&
        this.user.biography.split(' ').length >= 49
      ) {
        this.error = false;
      } else {
        this.error = true;
      }
    });
    this.coursesService.getCategories().subscribe(res=> {
      this.course_categories =res
      console.log(this.course_categories)
    })
  }
  ngOnDestroy() {
    //save status of data into database
    if (this.isChange && !this.pressUpdateBtn) {
      this.updateData();
    }

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getCourseInfor() {
    this.courseService
      .getCourseInfor(this.courseId, this.getCourseInforMode)
      .subscribe((res: any) => {
        this.formGroup.patchValue({
          title: res?.title,
          description: res?.description,
          category: res?.category,
          teaching_language: res?.teaching_language,
        });

        this.img = res.img ? `${api_urls.LOCAL_API_URL}/${res?.img}` : null;
        this.imgName = res.img_name ? res.img_name : null;
      });
  }

  get FormValue() {
    return this.formGroup.value;
  }

  getFile(event: any) {
    this.curriculumService.uploadFile(event.file, 'public').subscribe((res) => {
      let img = res.data.file;
      //update to database
      let courseBodyUpdate: Course = { img: img, img_name: event.imgName };
      this.courseService
        .updateCourse(this.courseId, courseBodyUpdate)
        .subscribe((res) => {
          alert('Cập nhật thành công');
        });
    });
  }

  updateData() {
    let courseBodyUpdate: Course = { ...this.FormValue };
    this.courseService
      .updateCourse(this.courseId, courseBodyUpdate)
      .subscribe();
  }
}
