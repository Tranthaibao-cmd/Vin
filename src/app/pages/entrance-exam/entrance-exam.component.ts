import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntranceExamService } from './entrance-exam.service';

@Component({
  selector: 'app-entrance-exam',
  templateUrl: './entrance-exam.component.html',
  styleUrls: ['./entrance-exam.component.scss'],
})
export class EntranceExamComponent implements OnInit{
  list_ky_thi_observable!:Observable<any>
  course_id: number;
  constructor(private route: ActivatedRoute,private EntranceExamService:EntranceExamService,private router:Router) {
    this.course_id = Number(
      this.route.snapshot.queryParamMap.get('course_id')!
    );
  }
  ngOnInit()
  {
    this.list_ky_thi_observable = this.GetAllKyThi(this.course_id)
  }
  GetAllKyThi(course_id:number)
  {
    return this.EntranceExamService.GetAllKyThi(course_id).pipe(map(data=>
      {
        console.log(data)
        return data
      }));
  }
  goToEntranceExam(kythi:any)
  {
    this.router.navigateByUrl(`/entrance-exam/${kythi.id}?thoigianlambai=${kythi.thoi_gian_lam_bai}`)
  }
}

