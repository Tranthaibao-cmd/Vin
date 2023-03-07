import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '@environment/environment';
import { first, tap } from 'rxjs/operators';
@Injectable({providedIn: 'root',})

export class ImageService {
  url = `${environment.apiUrl}`;
    constructor(private http: HttpClient) {}
    private _refresh$ = new Subject<void>();
    get refresh$(){
    return this._refresh$;
  }
  add(anh: any):Observable<any>{
    var formData: any = new FormData();
    formData.append("uploaded_file", anh);
    return this.http.post<any>(
      `${this.url}`,formData
    ).pipe(first());
  }
}

