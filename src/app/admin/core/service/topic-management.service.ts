import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TopicManagementService {
  url = `${environment.apiUrl2}/topic`;
  constructor(private http: HttpClient) {}
  get(id: string) {
    console.log(id)
    return this.http.get<any>(`${this.url}/ma_lop_chuadk?ma_lop_hoc=${id}`);
  }
  upsert(data: any) {
    return this.http.post<any>(`${this.url}`, data);
  }
  uploadFile(formData: FormData) {
    return this.http.post<any>(`${this.url}/uploadfile/`, formData, {
      reportProgress: true,
      observe: 'body',
    });
  }
  deleteTopic(topic_id:string):Observable<any> {
    const url = `${this.url}/${topic_id}`;
    return this.http.delete<any>(url).pipe(first())
  }
  updateTopic(topicId:string, payload:any):Observable<any> {
    const uri = `${this.url}/${topicId}`;
    return this.http.put<any>(uri, payload).pipe(first())
  }
}
