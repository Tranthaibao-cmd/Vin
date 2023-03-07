import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  fmt,
  mapToFormData,
  mapToHttpParamsQuery,
} from '@core/utilities/helpers';
import { api_urls } from '@shared/api_url';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Content } from '../models/content';
import { ResourseFile } from '../models/ResourseFile';

const BASE_URL = api_urls.LOCAL_API_URL;

const routes = {
  addContent: `${BASE_URL}/content`,
  getAllContentViaCourse: `${BASE_URL}/course/{course_id}/content/all`,
  uploadFile: `${BASE_URL}/resourse/uploadFile`,
  addResourse: `${BASE_URL}/resourse`,
  updateContent: `${BASE_URL}/content/{content_id}`,
  getAllResourseViaContentId: `${BASE_URL}/content/{content_id}/resourses`,
  deleteContent: `${BASE_URL}/content/{contentId}`,
  deleteResourse: `${BASE_URL}/resourse/{resourse_id}`,
  getAllResourseViaContentIdAndResourseType: `${BASE_URL}/resourse/{content_id}/all`,
  getFileDownload: `${BASE_URL}/resourse/{resourse_id}`
};

@Injectable()
export class CurriculumService {
  constructor(private httpClient: HttpClient) {}

  addContent(contentBody: Content): Observable<any> {
    return this.httpClient.post(routes.addContent, contentBody).pipe(
      first(),
      map((res: any) => {
        return res.data;
      })
    );
  }

  getAllContentViaCourseId(course_id: string): Observable<Array<Content>> {
    let uri = fmt(routes.getAllContentViaCourse, { course_id });

    return this.httpClient.get<Content>(uri,).pipe(
      map((res: any) => {
        return res.status_code == 200 ? res.data : [];
      })
    );
  }

  uploadFile(file: File, mode: string = 'private'): Observable<any> {
    let formData = mapToFormData({ file: file });
    let params = mapToHttpParamsQuery({ mode: mode });
    return this.httpClient
      .post<any>(routes.uploadFile, formData, { params: params })
      .pipe(first());
  }

  addResourse(resourseBody: ResourseFile): Observable<any> {
    return this.httpClient.post(routes.addResourse, resourseBody).pipe(
      first(),
      map((res: any) => res.data)
    );
  }

  updateContent(
    content_id: string,
    contentBodyUpdate: Content
  ): Observable<any> {
    let uri = fmt(routes.updateContent, { content_id });
    return this.httpClient.patch(uri, contentBodyUpdate).pipe(
      first(),
      map((res: any) => {
        return res.data;
      })
    );
  }

  getAllResourseViaContentId(content_id: string): Observable<any> {
    let uri = fmt(routes.getAllResourseViaContentId, { content_id });
    return this.httpClient.get(uri).pipe(
      map((res: any) => {
        return res.status_code == 200 ? res.data : [];
      }),
      first()
    );
  }

  deleteContent(contentId: string): Observable<any> {
    let uri = fmt(routes.deleteContent, { contentId });
    return this.httpClient.delete(uri).pipe(first());
  }

  deleteResourse(resourse_id: string): Observable<any> {
    let uri = fmt(routes.deleteResourse, { resourse_id });
    return this.httpClient.delete(uri).pipe(first());
  }

  getAllResourseViaContentIdAndResourseType(
    content_id: string,
    resourse_type: string = 'all',
    mode: string = 'preview'
  ): Observable<any> {
    let uri = fmt(routes.getAllResourseViaContentIdAndResourseType, {
      content_id,
    });
    let params = mapToHttpParamsQuery({
      mode: mode,
      resourse_type: resourse_type,
    });
    return this.httpClient.get(uri, { params: params }).pipe(
      first(),
      map((res: any) => res.data)
    );
  }

  getDownloadFile(resourse_id:string,mode:string): Observable<any> {
    let uri = fmt(routes.getFileDownload,{ resourse_id})
    let params = mapToHttpParamsQuery({mode:mode})
    return this.httpClient.get(uri,{params:params,responseType:'blob'}).pipe(first())
  }
}
