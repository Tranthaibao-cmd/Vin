import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:'app-error',
    templateUrl:'./error.component.html',
    styleUrls:['./error.component.scss']
})
export class ErrorComponent implements OnInit
{
    
    @Input('status-code') status_code = 403
    @Input('message') message = "Bạn không có quyền "
    constructor(private route:ActivatedRoute){
        let status_code_string = this.route.snapshot.queryParamMap.get('status_code')
        this.status_code = status_code_string != null? Number(status_code_string) : 403;
        if(this.status_code === 404)
        {
            this.message = 'Kết quả không được tìm thấy'
        }
    }

    ngOnInit()
    {
        this.getLastCharacterOfStatusCode()
    }

    getLastCharacterOfStatusCode()
    {
        this.status_code = Number(String(this.status_code).slice(-1))
    }

}