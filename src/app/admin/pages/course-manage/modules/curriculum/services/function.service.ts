import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fmt } from '@core/utilities/helpers';
import { api_urls } from '@shared/api_url';
import { first } from 'rxjs/operators';

import { Function } from '../models/function';

const BASE_URL = `${api_urls.LOCAL_API_URL}/function`;
const routes = {
  updateFunc: `${BASE_URL}`,
  getFunc: `${BASE_URL}/{content_id}`
};
@Injectable()
export class FunctionService {
  constructor(private httpClient: HttpClient) {}

  updateFunction(func: Function) {
    return this.httpClient.post(routes.updateFunc, func).pipe(first());
  }

  getFunction(content_id:string){
    let uri = fmt(routes.getFunc,{content_id})
    return this.httpClient.get(uri).pipe(first());
  }
}
