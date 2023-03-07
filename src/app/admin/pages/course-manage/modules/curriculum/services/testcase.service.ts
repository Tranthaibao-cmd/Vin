import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fmt } from '@core/utilities/helpers';
import { api_urls } from '@shared/api_url';

import {  Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { TestCase } from '../models/testcase';

const BASE_URL = `${api_urls.LOCAL_API_URL}/testcase`;

const routes = {
  addTestcase: `${BASE_URL}`,
  getAllTestcaseViaContentId: `${BASE_URL}/{content_id}/all`,
  updateTestcase: `${BASE_URL}/{testcaseId}`,
  deleteTestcase: `${BASE_URL}/{testcaseId}`,
  deleteAllTestcaseOfContent: `${BASE_URL}/content/{content_id}/all`
};

@Injectable()
export class TestcaseService {
  constructor(private httpClient: HttpClient) {}

  addTestcase(testcase: TestCase): Observable<any> {
    return this.httpClient.post(routes.addTestcase, testcase).pipe(first());
  }

  getAllTestcaseViaContentId(content_id:string): Observable<any> {
    let uri = fmt(routes.getAllTestcaseViaContentId,{content_id})
    return this.httpClient.get(uri).pipe(first(),map((res:any)=>{

      return res.data
    }))
  }

  updateTestcase(testcaseId:string,tescaseBodyUpdate:TestCase){
    let uri = fmt(routes.updateTestcase,{testcaseId})
    return this.httpClient.patch(uri,tescaseBodyUpdate).pipe(first())
  }

  deleteTestcase(testcaseId:string){
    let uri  = fmt(routes.deleteTestcase,{testcaseId})

    return this.httpClient.delete(uri).pipe(first())
  }

  deleteAllTestcaseOfContent(content_id:string): Observable<any> {
    let uri = fmt(routes.deleteAllTestcaseOfContent,{content_id})
    return this.httpClient.delete(uri).pipe(first())
  }
}
