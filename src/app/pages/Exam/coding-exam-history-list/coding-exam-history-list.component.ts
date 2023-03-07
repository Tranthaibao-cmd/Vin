import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { QuizesService } from "../_services/quizes.service";

@Component({
    selector:'app-coding-exam-history-list',
    templateUrl:'./coding-exam-history-list.component.html',
    styleUrls:['./coding-exam-history-list.component.scss']
})
export class CodingExamHistoryListComponent implements OnInit,OnDestroy{
    subscription:Subscription =  new Subscription()
    course_id:any
    coding_exam_name:any

    displayedColumns: string[] = ['Số thứ tự','Tên','Điểm','Ngày tạo','Hoạt động'];
    dataSource = new MatTableDataSource<any>()

    @ViewChild(MatPaginator) paginator: any

    constructor(private route:ActivatedRoute,
        private quizService:QuizesService){
            
        }

    ngOnInit(){
        this.course_id = this.route.snapshot.queryParamMap.get('course_id')
        this.coding_exam_name = this.route.snapshot.queryParamMap.get('subtask');
        this.onGetCodingExamHistory()
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
      }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }

    onGetCodingExamHistory()
    {
        var sub = this.quizService.getCodingExamTestHistory(this.course_id,this.coding_exam_name).subscribe({
            next:(data:any)=>
            {
                this.dataSource.data = data
            },
            error:(err:HttpErrorResponse)=>
            {
                console.error(err);
                
            },
            complete:()=>{console.log('complte get coding exam history');
            }
        })
        this.subscription.add(sub)
    }


}