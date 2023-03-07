import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, from, Observable, of } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { UserIn } from '../interfaces/UserIn';
import { MOODLE_CURRENT_USE, MOODLE_JWT_TOKEN } from '../../configs/constants';
import { mapToFormData } from '@core/utilities/helpers';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  returnUrl: string;

  userSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private user:Observable<any> = this.userSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';

  }
  ngOnDestroy() {
    this.stopRefreshTokenTimer();
  }
  ngOnInit(){

  }
  setUser(userData: any) {
    //localStorage.setItem(MOODLE_CURRENT_USE, JSON.stringify(userData));

    this.userSubject.next(userData);
  }

  getUser() {
    return this.user;
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  login(loginDataFormValue: { username: string; password: string }) {
    let loginFormData = mapToFormData(loginDataFormValue);
    return this.http
      .post<any>(`${environment.authURL}/auth/token`, loginFormData, {
        withCredentials: true,
      })
      .pipe(
        map((userData: any) => {


          //save user current
          this.setUser(userData.user_infor);

          this.saveAccessTokenInLocalStorage(userData.access_token);

          //set time to get new access token
          this.startRefreshTokenTimer(userData.expire_token_time_minutes);
          return userData;
        })
      );
  }

  userInfor(): Observable<any> {
    return this.http
      .get(`${environment.authURL}/auth/users/me/`, { withCredentials: true })
      .pipe(
        first(),
        map((res: any) => {
          let userData = res.data;
          this.setUser(userData);
        })
      );
  }

  refreshToken() {
    return this.http
      .get<any>(`${environment.authURL}/auth/refresh-token`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {

          this.saveAccessTokenInLocalStorage(res.access_token);
          this.startRefreshTokenTimer(res.expire_token_time_minutes);

          return res
        })
      );
  }

  logout() {
    this.stopRefreshTokenTimer();

    this.setUser(null);
    localStorage.removeItem(MOODLE_CURRENT_USE);
    localStorage.removeItem(MOODLE_JWT_TOKEN);

    this.router.navigateByUrl('/login');
  }

  // helper methods

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer(expire_token_time_minutes: number) {

    const timeout = (expire_token_time_minutes - 2)*60 * 1000;
    console.log(timeout);
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  //save token to local storage and ser up time to refresh token
  saveAccessTokenInLocalStorage(accessToken: string) {
    //encode access token
    let accessTokenEncode = btoa(accessToken);
    //save to localStorage
    localStorage.setItem(MOODLE_JWT_TOKEN, JSON.stringify(accessTokenEncode));
    //refresh token
  }

  getAccesTokenFromLocalStorage() {
    const accessTokenEncodeJson = localStorage.getItem(MOODLE_JWT_TOKEN);

    if (accessTokenEncodeJson != null) {
      let accessTokenEncode = JSON.parse(accessTokenEncodeJson);
      return atob(accessTokenEncode);
    }
    return null;
  }
}
