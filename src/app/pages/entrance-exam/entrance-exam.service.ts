import { KyThiService } from "@admin/pages/exam/list-exam/kythi.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";


@Injectable({
    providedIn:'root'
})
export class EntranceExamService{
    private BASE_URL = environment.apiUrl
    constructor(private http:HttpClient,private KyThiService:KyThiService){}

    GetAllKyThi(course_id:number):Observable<any>
    {
        return this.KyThiService.getAllKyThiViaCourse(course_id);
    }
}