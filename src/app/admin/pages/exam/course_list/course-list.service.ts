import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class CourseListService{
    private BASE_URL = environment.apiUrl;
    constructor(private http:HttpClient){}

    public GetAllCourse():Observable<any>
    {
        const url = `${this.BASE_URL}/course/all`
        return this.http.get<any>(url)
    }
}