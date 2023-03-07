import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '@modules/home/services/cart.service';
import { Course } from '@modules/new-course-creation/models/course';
import { notiType } from '@modules/notification/model/enum';
import { INotification } from '@modules/notification/model/interface';
import { NotificationService } from '@modules/notification/services/notification.service';
import { BaseComponent } from '@shared/abstract/base.component';
import { api_urls } from '@shared/configs/api_url';
import { pipe, takeUntil } from 'rxjs';
import { CourseService } from './services/course.service';

@Component({
  selector: 'ex-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent extends BaseComponent implements OnInit {
  courses: Course[];
  coursesAll: Course[];
  like: boolean = false;
  dataSource: any;
  link = api_urls.LOCAL_API_URL;
  noti: INotification = {
    type: notiType.success,
    message: 'Thêm mới thành công',
  };
  form: FormGroup;
  categories = [];
  sort = [
    { text: 'Tên từ A đến Z', value: 'nameasc' },
    { text: 'Tên từ Z đến A', value: 'namedesc' },
    { text: 'Giá từ thấp đến cao', value: 'priceasc' },
    { text: 'Giá từ cao xuống thấp', value: 'pricedesc' },
  ];
  constructor(
    private courseService: CourseService,
    private router: Router,
    private cartService: CartService,
    private notiService: NotificationService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    super();
  }
  ngOnInit() {
    this.buildForm();
    this.getCourses();
    this.getCategories();
  }
  buildForm() {
    const params = this.route.snapshot.queryParamMap;
    console.log(params);
    this.form = this.fb.group({
      category: params.get('category') || '',
      name: params.get('name') || '',
      sort: params.get('sort') || '',
    });
  }
  getCourses() {
    this.courseService
      .getCourses()
      .pipe(takeUntil(this.ngUnsubscibed))
      .subscribe((res) => {
        this.coursesAll = [...res];
        this.filter();
      });
  }
  getCategories() {
    this.courseService
      .getCategories()
      .pipe(takeUntil(this.ngUnsubscibed))
      .subscribe((res) => {
        this.categories = res;
      });
  }
  filter() {
    this.router.navigate(['/courses'], {
      queryParams: this.form.getRawValue(),
    });
    this.courses = [...this.coursesAll]
    if (this.form.getRawValue().category)
      this.courses = this.courses.filter(
        (c) => c.category === this.form.getRawValue().category
      );
    if (this.form.getRawValue().name)
      this.courses = this.courses.filter((c) =>
        c.title.toLowerCase().includes(this.form.getRawValue().name.toLowerCase())
      );
    if (this.form.getRawValue().sort) {
      switch (this.form.getRawValue().sort) {
        case 'nameasc':
          this.courses.sort((a, b) => {
            if (a.title?.toLowerCase() > b.title?.toLowerCase()) return 1;
            if (a.title?.toLowerCase() < b.title?.toLowerCase()) return -1;
            return 0;
          });
          break;
        case 'namedesc':
          this.courses.sort((a, b) => {
            if (a.title?.toLowerCase() > b.title?.toLowerCase()) return -1;
            if (a.title?.toLowerCase() < b.title?.toLowerCase()) return 1;
            return 0;
          });
          break;
        case 'priceasc':
          this.courses.sort((a, b) => a.price - b.price);
          break;
        case 'pricedesc':
          this.courses.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }
  }
  goToDetail(id: string) {
    this.router.navigateByUrl(`/course/${id}?mode=detail`);
  }

  addToCart(course: Course) {
    this.cartService.addToCart(course);
    this.notiService.addNoti(this.noti);
    // this.createComponent();
  }
}
