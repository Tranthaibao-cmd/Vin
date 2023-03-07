import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamManagementService {
  private BASE_URL = environment.apiUrl2;

  constructor(private http: HttpClient) { }

  getAllExam(){
    let apiUrl = `${this.BASE_URL}/quan_ly_ky_thi/`;
    return this.http.get<any>(apiUrl)
  }
  getbasedID(id: string){
    let apiUrl = `${this.BASE_URL}/quan_ly_ky_thi/?id_lop=${id}`;
    return this.http.get<any>(apiUrl)
  }
  addExam(exam: any):Observable<any>{
    let apiUrl = `${this.BASE_URL}/quan_ly_ky_thi/`;
    return this.http.post<any>(apiUrl, exam)
  }
  updateExam(exam: any, id: any): Observable<any>{
    let apiUrl = `${this.BASE_URL}/quan_ly_ky_thi/${id}`;
    return this.http.put<any>(apiUrl, exam)
  }
  deleteExam(Id: any){
    let apiUrl = `${this.BASE_URL}/quan_ly_ky_thi/${Id}`;
    return this.http.delete<any>(apiUrl)
  }
}
