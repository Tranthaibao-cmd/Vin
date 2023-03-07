import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AuthenticationService } from '@core/_services/authentication.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private AuthenticationService: AuthenticationService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = this.AuthenticationService.getAccesTokenFromLocalStorage();
    let authentication = accessToken ? `Bearer ${accessToken}` : `Bearer`
    request = request.clone({
      setHeaders: { Authorization: authentication },
    });

    return next.handle(request);
  }
}
