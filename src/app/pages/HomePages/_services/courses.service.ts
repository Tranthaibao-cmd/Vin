import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Course } from "src/app/pages/HomePages/_model/course";
import { environment } from "src/environments/environment";


@Injectable({ providedIn: 'root' })
export class CoursesService {
    BASE_URL:string = environment.apiUrl ;

    private courseSubject$ : BehaviorSubject<number> = new BehaviorSubject<any>(-1);
    private course_id= this.courseSubject$.asObservable();

    constructor(private http:HttpClient){
       
    }
    //set up get,set for course

    public getCourseId():Observable<number>
    {
        return this.course_id;
    }

    public set Course(course_id:number)
    {
        this.courseSubject$.next(course_id);
    }

    

    getAllCourse():Observable<Course[]>
    {
        return this.http.get<Course[]>(`${this.BASE_URL}/course`);
    }



    
}