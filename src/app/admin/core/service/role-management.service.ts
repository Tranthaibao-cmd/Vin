import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';


@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {
  url = `${environment.apiUrl2}/role`
  constructor(private http: HttpClient) { }

  getRole(name: any){
    return this.http.get<any>(`${this.url}/?name=${name}`)
  }

  add(role: any){
    return this.http.post<any>(`${this.url}`, role)
  }

  update(id: string, role: any){
    const url2 = `${this.url}/${id}`;
    return this.http.put<any>(url2, role).pipe(first())
  }

  delete(id: string){
    const url2 = `${this.url}/${id}`;
    return this.http.delete<any>(url2)
  }
}
