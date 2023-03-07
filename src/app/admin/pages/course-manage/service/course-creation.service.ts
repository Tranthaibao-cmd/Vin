import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fmt, mapToHttpParamsQuery } from '@core/utilities/helpers';
import { api_urls } from '@shared/api_url';
import {  Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Course } from '../modules/curriculum/models/course';


const BASE_URL = api_urls.LOCAL_API_URL;
const routes = {
  addNewCourse: `${BASE_URL}/course`,
  updateCourse: `${BASE_URL}/course/{course_id}`,
  getCourseInfor: `${BASE_URL}/course/{courseId}/infor`,
  review:`${BASE_URL}/course/{courseId}/review`,
  changeCourseStatus: `${BASE_URL}/course/{courseId}/change-course-status`
};

@Injectable()
export class CourseCreationService {
  constructor(private httpClient: HttpClient) {}

  addNewCourse(course_body: Course): Observable<any> {
    return this.httpClient.post(routes.addNewCourse, course_body).pipe(first());
  }

  updateCourse(course_id: string, courseBodyUpdate: Course): Observable<any> {
    let uri = fmt(routes.updateCourse, { course_id });

    return this.httpClient.patch<any>(uri, courseBodyUpdate).pipe(first());
  }

  getCourseInfor(courseId: string, mode: string = 'goals'): Observable<any> {
    let uri = fmt(routes.getCourseInfor, { courseId });
    let params = mapToHttpParamsQuery({ mode: mode });
    return this.httpClient.get(uri, { params: params }).pipe(first(),map((res:any)=>res.data));
  }

  CourseReview(courseId:string): Observable<any> {
    let uri = fmt(routes.review, { courseId });
    return this.httpClient.get(uri).pipe(first(),map((res:any)=>res.data))
  }

  changeCourseStatus(courseId:string){
    let uri = fmt(routes.changeCourseStatus, { courseId });
    return this.httpClient.patch(uri,null).pipe(first(),map((res:any)=>res.data))
  }
}
