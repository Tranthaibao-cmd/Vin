import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { first } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Quiz } from "../quizes/quiz.model";


@Injectable({providedIn:'root'})
export class QuizesService
{

    BASE_ORIGIN = environment.apiUrl
    constructor(private http:HttpClient){}


    private quizSubject$ = new BehaviorSubject(null)
    private quiz = this.quizSubject$.asObservable()


    public get Quiz():any
    {
        return this.quizSubject$.value
    }


    public set Quiz(quiz:any)
    {
        this.quizSubject$.next(quiz)
        this.updateExamToHistory(quiz).pipe(first()).subscribe()
    }

    getQuizViaId(quiz_id:number,course_name:string,quiz_name:string):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/quiz/${quiz_id}?course_name=${course_name}&quiz_name=${quiz_name}`


        return this.http.get<any>(path)
    }

    getAllQuiz(course_id:number):Observable<{course_name:string,quiz_list:Quiz[]}>
    {
        const path = `${this.BASE_ORIGIN}/quiz/of_course/${course_id}`
        return this.http.get<{course_name:string,quiz_list:Quiz[]}>(path);
    }

    getAllCodingExam(course_id:number):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/coding-exams/?course_id=${course_id}`
        return this.http.get<any>(path)
    }

    getQuizHistory(quiz_id:number):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/quiz/${quiz_id}/history`
        return this.http.get<any>(path)
    }

    deleteQuiz(object_id:string):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/quiz/delete/${object_id}`
        return this.http.delete<any>(path)
    }

    getHistoryExamDetail(object_id:string):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/quiz/${object_id}/history_detail`
        return this.http.get<any>(path)
    }

    updateExamToHistory(quiz:Quiz):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/quiz/update_history`
        return this.http.put<any>(path,quiz)
    }

    addExam(server_ip:string,quiz:Quiz,course_name:string,quiz_name:string):Observable<any>
    {
        const path = `${server_ip}/quiz/submit?course_name=${course_name}&quiz_name=${quiz_name}`

        return this.http.post<any>(path,quiz)
    }

    //for coding exam test
    getDetailsCodingExamTest(course_id:string,quiz_name:string):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/coding-exams/start?course_id=${course_id}&subtask=${quiz_name}`
        return this.http.get<any>(path)
    }

    submitCodingExam(course_id:string,quiz_name:string):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/coding-exams/submit?course_id=${course_id}&subtask=${quiz_name}`
        console.log(path)
        return this.http.get<any>(path)
    }
    //get history for coding exam test
    getCodingExamTestHistory(course_id:string,exam_coding_name:string):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/coding-exams/history?course_id=${course_id}&subtask=${exam_coding_name}`
        return this.http.get<any>(path)
    }

    getAllExamHistory(object_id:string):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/quiz/exam_history/${object_id}`
        return this.http.get<any>(path)
    }

    getCodingExamHistory(object_id:string):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/quiz/my_coding_exam_history/${object_id}`
        return this.http.get<any>(path)
    }

    getSolutionCodingExam(quiz_id:number):Observable<any>
    {
        const path = `${this.BASE_ORIGIN}/quiz/solution/${quiz_id}`
        return this.http.get<any>(path)
    }
}
