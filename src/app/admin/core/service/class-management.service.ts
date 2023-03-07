import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { api_urls } from '@shared/api_url';
import { Course } from '../../pages/course-manage/modules/curriculum/models/course';
import { mapToFormData, mapToHttpParamsQuery } from '../utilities/helpers';
@Injectable({ providedIn: 'root' })
export class ClassManagementService {
  url = `${api_urls.LOCAL_API_URL}`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();

  get refresh$() {
    return this._refresh$;
  }

  getClassList(): Observable<any> {
    // return this.http.get<any>(`${this.url}/?ten_lop=${ten_lop}`);
    return this.http.get<any>(`${this.url}/course/all`);
  }
  getClassID(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/MonHoc?id_mon_hoc=${id}`);
  }
  addClass(classBody:Course):Observable<any>{
    let url =`${this.url}/course`
    return this.http.post(url,classBody).pipe(
      first(),
      map((res:any)=>{
        return res.data
      })
    )
  }
  updateClass(classBody: Course, course_id: string):Observable<any>{
    let url =`${this.url}/course/${course_id}`
    return this.http.patch(url, classBody).pipe(
      first(),
      map((res:any)=>{
        return res.data
      })
    )
  }
  deleteClass(course_id:string):Observable<any>{
    let url = `${this.url}/course/${course_id}`
    return this.http.delete(url).pipe(first())
  }
  uploadFile(file: File, mode: string = 'public'): Observable<any> {
    let url = `${this.url}/resourse/uploadFile`
    let formData = mapToFormData({ file: file });
    let params = mapToHttpParamsQuery({ mode: mode });
    return this.http
      .post<any>(url, formData, { params: params })
      .pipe(first(),map((res:any)=>res.data));
  }
  update(
    lop: any,
    id: string,
    subject_id: string,
    category: any,
    title: any,
    avatar: any,
    status: any
  ): Observable<any> {
    return this.http
      .put<any>(
        `${this.url}/${id}?id_mon_hoc=${subject_id}&ten_mon_hoc=${category}&ten_lop=${title}&avatar=${avatar}&trang_thai=${status}`,
        lop
      )
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}?force=true`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
