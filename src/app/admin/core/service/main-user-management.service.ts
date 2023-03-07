import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, retry } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { environment } from '@environment/environment';
import { api_urls } from '@shared/api_url';
import { fmt, mapToHttpParamsQuery } from '@core/utilities/helpers';

@Injectable({
  providedIn: 'root'
})
export class MainUserManagementService {
  private BASE_URL = api_urls.LOCAL_API_URL;
  constructor(private http: HttpClient) { }

  getMainUserList(course_id:string = null):Observable<any>{
    var url = `${this.BASE_URL}/user/all`;
    let params = mapToHttpParamsQuery({"course_id":course_id})
    return this.http.get<any>(url,{params:params});
  }

  AssignUserToCourse(course_id:string,learners_id:Array<string>){
    let url=`${this.BASE_URL}/user/class-assignment/course/{course_id}`
    let urlWithPath = fmt(url,{course_id})
    return this.http.post(urlWithPath,learners_id)
  }

  importUserDataFromExcel(JsonDataArray:any){
    let url=`${this.BASE_URL}/user/import-user-data`

    return this.http.post(url,JsonDataArray)
  }

  addNewUser(newUser:any){
    var url = `${this.BASE_URL}/user`;
    return this.http.post<any>(url, newUser)
  }

  addMainUser(
    MainUserList: any,
    first_name: any,
    last_name: any,
    email: any,
    hashed_password:any,
    avatar_pic: any
    ):Observable<any>{

    var url = `${this.BASE_URL}/user/?first_name=${first_name}&last_name=${last_name}&email=${email}&hashed_password=${hashed_password}&avatar_pic=${avatar_pic}`;
    return this.http.post<any>(url, MainUserList).pipe(
      retry(1),
      first()
    )
  }

  addFileUser(File: any):Observable<any>{
    var formData: any = new FormData();
    formData.append("file", File)
    var url1 = `${this.BASE_URL}/user/importUser/`;
    return this.http.post<any>(url1, formData).pipe(first());
  }

  updateMainUser(
    MainUserList: any,
    id: string,
    first_name: any,
    last_name: any,
    email: any,
    ):Observable<any>{
    var url = `${this.BASE_URL}/user/user/${id}?first_name=${first_name}&last_name=${last_name}&email=${email}`;
    return this.http.put<any>(url, MainUserList).pipe(
      retry(1),
      first()
    )
  }

  updatePassword(password: string, id: string):Observable<any>{
    var url = `${this.BASE_URL}/user/pass/${id}?password=${password}`;
    return this.http.put<any>(url, password).pipe(
      retry(1)
    )
  }

  deleteMainUser(Id: string):Observable<any>{
    var url = `${this.BASE_URL}/user/${Id}`;
    return this.http.delete<any>(url);
  }
}
