import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectsManagementService {
  private BASE_URL = environment.apiUrl2;
  url = `${this.BASE_URL}/monhoc`;
  constructor(private http: HttpClient) { }

  getSubjectList():Observable<any>{
   
    return this.http.get<any>(this.url).pipe(first())
  }
  search(a: any):Observable<any>{
    var url = `${this.BASE_URL}/monhoc/?ten_mon_hoc=${a}`;
    return this.http.get<any>(url)
  }
  addSubject(Subject: any):Observable<any>{
    var url = `${this.BASE_URL}/monhoc`;
    return this.http.post<any>(url, Subject).pipe(
      retry(1),
      first()
    );
  }
  updateSubject(Subject: any, id: string):Observable<any>{
    var url = `${this.BASE_URL}/monhoc/${id}`;
    return this.http.put<any>(url, Subject).pipe(
      retry(1),
      first()
    );
  }
  deleteSubject(Id: string):Observable<any>{
    var url = `${this.BASE_URL}/monhoc/${Id}`;
    return this.http.delete<any>(url);
  }
}
