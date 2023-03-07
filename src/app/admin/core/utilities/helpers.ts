import { HttpParams } from '@angular/common/http';

export function fmt(text: string, myHash: any) {
  let key;
  // tslint:disable-next-line: forin
  for (key in myHash) {
    text = text.replace(new RegExp('\\{' + key + '\\}', 'gm'), myHash[key]);
  }
  return text;
}

export function isEmpty(args: any): boolean {
  return (
    args === null || args === undefined || args === '' || args.length === 0
  );
}

export function isNotEmpty(args: any): boolean {
  return !isEmpty(args);
}

export function mapToHttpParamsQuery(params: any): HttpParams {
  let httpParams: HttpParams = new HttpParams();
  for (const property in params) {
    if (params.hasOwnProperty(property) && isNotEmpty(params[property])) {
      httpParams = httpParams.set(property, params[property]);
    }
  }
  return httpParams;
}

export function mapToFormData(body: any): FormData {
  const formData = new FormData();
  for (const property in body) {
    if (body.hasOwnProperty(property) && isNotEmpty(body[property])) {
      formData.append(property, body[property]);
    }
  }
  return formData;
}

export function scrollToTopPage() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
