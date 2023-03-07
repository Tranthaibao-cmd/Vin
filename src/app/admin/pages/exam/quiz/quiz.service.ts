import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class QuizCreateService{
    private BaseUrl= environment.apiUrl;
    constructor(private http:HttpClient){

    }
    GetCauHoiViaKyThi(ky_thi_id:string):Observable<any>
    {
        let apiUrl= `${this.BaseUrl}/cauhoi/kythi/${ky_thi_id}`
        return this.http.get<any>(apiUrl)
    }
    InsertQuiz(dataQuiz:any):Observable<any>{
        let apiUrl= `${this.BaseUrl}/cauhoi/`
        return this.http.post<any>(apiUrl,dataQuiz);
    }
    DeleteQuiz(cauhoiid:string):Observable<any>
    {
        let apiUrl= `${this.BaseUrl}/cauhoi/${cauhoiid}`
        return this.http.delete<any>(apiUrl)
    }
    PutQuiz(cauhoiid:string,cauhoi:any):Observable<any>
    {
        let apiUrl= `${this.BaseUrl}/cauhoi/${cauhoiid}`
        return this.http.put<any>(apiUrl,cauhoi)
    }
  
}
