import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PrevilegeService {
  private BASE_URL = environment.apiUrl2;

  constructor(private http: HttpClient) {}

  getPrevilege(name: any): Observable<any>{
    let apiUrl = `${this.BASE_URL}/privilege/?name=${name}`;
    return this.http.get<any>(apiUrl)
  }

  getAllPrevilege(): Observable<any>{
    let apiUrl = `${this.BASE_URL}/privilege/GetAll`;
    return this.http.get<any>(apiUrl)
  }

  addPrevilege(previlege: any): Observable<any>{
    let apiUrl = `${this.BASE_URL}/privilege/`;
    return this.http.post(apiUrl, previlege)
  }

  updatePrevilege(previlege: any, id: any): Observable<any>{
    let apiUrl = `${this.BASE_URL}/privilege/${id}`;
    return this.http.put(apiUrl,previlege)
  }

  deletePrevilege(id: any){
    let apiUrl = `${this.BASE_URL}/privilege/${id}`;
    return this.http.delete<any>(apiUrl)
  }
}
