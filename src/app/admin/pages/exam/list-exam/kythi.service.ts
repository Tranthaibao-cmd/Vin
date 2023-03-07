import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class KyThiService{
    BaseUrl= environment.apiUrl;
    constructor(private http:HttpClient){

    }

    InsertKyThi(dataKyThi:any):Observable<any>{
        let apiUrl= `${this.BaseUrl}/kythi/`
        return this.http.post<any>(apiUrl,dataKyThi);
    }
    getAllKyThi():Observable<any>{
        let apiUrl = `${this.BaseUrl}/kythi/GetAll`
        return this.http.get<any>(apiUrl)
    }
    getAllKyThiViaCourse(course_id:any):Observable<any>
    {
        let apiUrl = `${this.BaseUrl}/kythi/GetAllViaCourse/${course_id}`
        return this.http.get<any>(apiUrl)
    }
    updateKyThi(kyThiId:any,kyThi:any):Observable<any>
    {
        let apiUrl = `${this.BaseUrl}/kythi/${kyThiId}`
        return this.http.put<any>(apiUrl,kyThi)
    }
    deleteKyThi(kyThiId:any)
    {
        let apiUrl = `${this.BaseUrl}/kythi/${kyThiId}`
        return this.http.delete<any>(apiUrl)
    }
    
}
