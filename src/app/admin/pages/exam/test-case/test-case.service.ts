import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class TestCaseService{
    BaseUrl= environment.apiUrl;
    constructor(private http:HttpClient){

    }

    GetAllTestCaseViaCauHoi(cauhoiid:string):Observable<any>
    {
        let apiUrl= `${this.BaseUrl}/testcase/cauhoi/${cauhoiid}`
        return this.http.get<any>(apiUrl)
    }

    InsertTestCase(testcase:any):Observable<any>{
        let apiUrl= `${this.BaseUrl}/testcase/`
        return this.http.post<any>(apiUrl,testcase);
    }
    UpdateTestCase(testcase_id:string,testcase:any):Observable<any>
    {
        let apiUrl= `${this.BaseUrl}/testcase/${testcase_id}`
        return this.http.put<any>(apiUrl,testcase)
    }
    DeleteTestCase(testcase_id:string):Observable<any>
    {
        let apiUrl= `${this.BaseUrl}/testcase/${testcase_id}`
        return this.http.delete<any>(apiUrl)
    }
  
}
