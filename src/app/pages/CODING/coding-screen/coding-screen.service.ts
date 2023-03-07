import { QuizCreateService } from '@admin/pages/exam/quiz/quiz.service';
import { TestCaseService } from '@admin/pages/exam/test-case/test-case.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CodingScreenService {
  private BASE_URL = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private CauHoiService: QuizCreateService,
    private TestCaseService: TestCaseService
  ) {}
  getAllCauHoi(id_ky_thi: string): Observable<any> {
    return this.CauHoiService.GetCauHoiViaKyThi(id_ky_thi);
  }

  getAllTestCase(id_cau_hoi: string): Observable<any> {
    const apiURL = `${this.BASE_URL}/testcase/${id_cau_hoi}/get_hide_testcase`

    return this.http.get<any>(apiURL);
  }

  getTemplateOfLanguage(
    cauhoiid: string,
    language_name: string
  ): Observable<string> {
    let apiUrl = `${this.BASE_URL}/cauhoi/${cauhoiid}/function_template?language=${language_name}`;
    return this.http.get<any>(apiUrl);
  }

  runTest(
    cauHoiId: string,
    language_name: string,
    code: string
  ): Observable<any> {
    //use http params for query parameters

    let params = new HttpParams().set('language', language_name);

    let apiUrl = `${this.BASE_URL}/cauhoi/${cauHoiId}/run_test`;
    return this.http.post<any>(apiUrl, code, {
      params: params,
    });
  }
}
