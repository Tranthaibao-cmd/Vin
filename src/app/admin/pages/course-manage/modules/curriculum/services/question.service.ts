import { HttpClient } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { fmt, mapToHttpParamsQuery } from '@core/utilities/helpers';
import { api_urls } from '@shared/api_url';

import {  Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Question } from '../models/question';

const BASE_URL = `${api_urls.LOCAL_API_URL}/question`;

const routes = {
  addQuestion: `${BASE_URL}`,
  getAllQuestionViaContent: `${BASE_URL}/{contentId}`,
  removeQuestion: `${BASE_URL}/{questionId}`,
  updateQuestion: `${BASE_URL}/{questionId}`
};

@Injectable()
export class QuestionService {
  constructor(private httpClient: HttpClient) {}

  addQuestion(question: Question): Observable<any> {
    return this.httpClient.post(routes.addQuestion, question).pipe(first());
  }

  getAllQuestionViaContent(contentId: string, mode: string = 'learning') {
    let uri = fmt(routes.getAllQuestionViaContent, { contentId });
    let params = mapToHttpParamsQuery({ mode: mode });
    return this.httpClient.get(uri, { params: params }).pipe(
      first(),
      map((res: any) => res.data)
    );
  }

  removeQuestion(questionId:string):Observable<any> {
    let uri = fmt(routes.removeQuestion,{questionId})
    return this.httpClient.delete(uri).pipe(first());
  }

  updateQuestion(questionId:string,questionBodyUpdate:Question): Observable<any> {
    let uri = fmt(routes.updateQuestion,{questionId})
    return this.httpClient.patch(uri,questionBodyUpdate).pipe(first());
  }
}
