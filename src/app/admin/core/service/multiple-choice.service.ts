import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MultipleChoiceService {
  private BASE_URL = environment.apiUrl2;
  
  constructor(private http: HttpClient) { }

  getQuestion():Observable<any>{
    let apiUrl = `${this.BASE_URL}/cauhoitracnghiem/`;
    return this.http.get<any>(apiUrl)
  }

  addQuestion(question: any):Observable<any>{
    let apiUrl = `${this.BASE_URL}/cauhoitracnghiem/`;
    return this.http.post<any>(apiUrl, question)
  }

  uploadQuestion(file: any, quiz_id: string){
    var formData: any = new FormData();
    let apiUrl = `${this.BASE_URL}/cauhoitracnghiem/uploadfile/`;
    formData.append("file", file);
    formData.append("id_de_trac_nghiem", quiz_id)
    return this.http.post<any>(apiUrl, formData)
  }

  updateQuestion(ques: any, id: string){
    let apiUrl = `${this.BASE_URL}/cauhoitracnghiem/${id}`;
    return this.http.put<any>(apiUrl, ques)
  }

  deleteQuestion(id: any){
    let apiUrl = `${this.BASE_URL}/cauhoitracnghiem/${id}`;
    return this.http.delete<any>(apiUrl)
  }
}


