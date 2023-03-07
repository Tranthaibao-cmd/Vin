import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_urls } from '@shared/api_url';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CourseService {
  readonly BASE_URL = `${api_urls.LOCAL_API_URL}`;
  constructor(private httpClient: HttpClient) {}
  getCourses(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/course/all/published`).pipe(
      map((data: any) => {
        let result = [];
        for (const d in data.data) {
          result.push(...data.data[d]);
        }
        return result;
      })
    );
  }
  getCategories(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.BASE_URL}/course-category`)
      .pipe(map((res) => res.data));
  }
}
