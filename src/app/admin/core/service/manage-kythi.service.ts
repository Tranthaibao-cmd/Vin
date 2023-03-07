import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '@environment/environment';
import { tap } from 'rxjs/operators';
@Injectable({providedIn: 'root',})

export class KyThiManagementService {
  url = `${environment.apiUrl2}/quan_ly_ky_thi`;
  constructor(private http: HttpClient) {}
  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }

getExamList():Observable<any>{
    return this.http.get<any>(`${this.url}/?page_size=1000&page=1`);
  }
add(exam: any):Observable<any>{
    return this.http.post<any>(
      `${this.url}`,exam
    ).pipe(
      tap(() =>{this._refresh$.next();}));
  }
update (exam: any,id: string): Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`,exam).pipe(
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
