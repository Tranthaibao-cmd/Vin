import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseListService } from './course-list.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list-admin.component.html',
  styleUrls: ['./course-list-admin.component.scss'],
})
export class CourseListAdminComponent implements OnInit {
  contentLoaded = false;

  dataSource = new MatTableDataSource<any>();

  course_list: Observable<any> = new Observable<any>();

  displayedColumns: string[] = [
    'Số thứ tự',
    'Tên khóa học',
    'Thời điểm bắt đầu',
    'Thời điểm kết thúc',
    'Hoạt động',
  ];

  @ViewChild('paginator') paginator: any;

  constructor(private CourserService: CourseListService,private router:Router) {}

  ngOnInit() {
    this.course_list = this.getAllCourse();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Filter(filter_data: any) {
    this.dataSource.filter = filter_data.target.value.trim().toLowerCase();
  }
  getAllCourse(): Observable<any> {
    return this.CourserService.GetAllCourse().pipe(
      map((data) => {
        this.contentLoaded = true;
        this.dataSource.data = data;

        return data;
      })
    );
  }
  DeThi(element:any)
  {
    let data_global_json = localStorage.getItem('DATA_GLOBAL')
    let data_global =data_global_json?JSON.parse(data_global_json):{}
    
    data_global['khoa_hoc']={course_id:element.course_id,course_name:element.fullname}
    localStorage.setItem('DATA_GLOBAL',JSON.stringify(data_global))

    this.router.navigateByUrl(`/admin/exam/${element.course_id}`)
  }
}
