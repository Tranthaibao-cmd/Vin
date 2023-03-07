import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizManagementService {
  private BASE_URL = environment.apiUrl2;

  constructor(private http: HttpClient) { }

  getQuiz():Observable<any>{
    let apiUrl = `${this.BASE_URL}/detracnghiem/`;
    return this.http.get<any>(apiUrl)
  }
  get(id: string) {
    let apiUrl = `${this.BASE_URL}/detracnghiem/${id}`;
    return this.http.get<any>(apiUrl);
  }
  addQuiz(quiz: any):Observable<any>{
    let apiUrl = `${this.BASE_URL}/detracnghiem/`;
    return this.http.post<any>(apiUrl, quiz)
  }
  updateQuiz(quiz: any, id: any):Observable<any>{
    let apiUrl = `${this.BASE_URL}/detracnghiem/${id}`;
    return this.http.put<any>(apiUrl, quiz)
  }
  deleteQuiz(Id: any){
    let apiUrl = `${this.BASE_URL}/detracnghiem/${Id}`;
    return this.http.delete<any>(apiUrl)
  }
}
