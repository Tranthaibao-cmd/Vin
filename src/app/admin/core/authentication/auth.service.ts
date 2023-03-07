import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fmt, mapToFormData } from '@core/utilities/helpers';
import { api_urls } from '@shared/api_url';
import {
  BehaviorSubject,
  EMPTY,

  from,
  Observable,
  of,
} from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';
import { ACCESS_TOKEN } from './constant';
import { FacebookUser, MailUser, User } from './user';

const BASE_URL = api_urls.LOCAL_API_URL;
const routes = {
  login: `${BASE_URL}/auth/token`,
  refreshToken: `${BASE_URL}/auth/refresh-token`,
  userInfor: `${BASE_URL}/auth/users/me/`,
  facebookAuthentication: `${BASE_URL}/auth/facebook-authenticate`,
};

@Injectable()
export class AuthService implements OnDestroy {
  //initialize

  EXPIRE_TOKEN_TIME_SECONDS = 0;
  REMAIN_TIME_TO_REFRESH_TOKEN_SECONDS = 120;
  private userSubject = new BehaviorSubject<any>(null);

  private refreshTokenTimeout: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  set User(data: MailUser | FacebookUser | User |null) {
    this.userSubject.next(data);
  }

  get User() {
    return this.userSubject.value;
  }

  get UserObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }

  login(loginDataFormValue: {
    username: string;
    password: string;
  }): Observable<any> {
    let loginFormData = mapToFormData(loginDataFormValue);
    return this.httpClient
      .post<any>(routes.login, loginFormData, { withCredentials: true })
      .pipe(
        first(),
        map((res: any) => {

          //save user current
          this.User = res.user_infor;
          //save expire token time
          this.EXPIRE_TOKEN_TIME_SECONDS = res.expire_token_time_minutes * 60;
          //encode acccess token
          let accessToken = res.access_token;
          this.saveAccessTokenInLocalStorage(accessToken);
        })
      );
  }

  logout() {

    //if facebook account
    if(this.User?.account_type == 'facebook'){

      this.logoutFBAccount()
    }

    this.User = null;

    this.stopRefreshTokenTimer();

    localStorage.removeItem(ACCESS_TOKEN);



    //this.router.navigateByUrl('/login');
  }

  refreshToken(): Observable<any> {
    return this.httpClient
      .get<any>(routes.refreshToken, { withCredentials: true })
      .pipe(
        first(),
        map((res) => {
          this.EXPIRE_TOKEN_TIME_SECONDS = res.expire_token_time_minutes * 60;
          this.saveAccessTokenInLocalStorage(res.access_token);
        })
      );
  }

  userInfor(): Observable<any> {
    return this.httpClient
      .get(routes.userInfor, { withCredentials: true })
      .pipe(
        first(),
        map((res: any) => {
          console.log(res)
          let userData = res.data;
          this.User = userData;
        })
      );
  }
  //save token to local storage and ser up time to refresh token
  saveAccessTokenInLocalStorage(accessToken: string) {
    //encode access token
    let accessTokenEncode = btoa(accessToken);
    //save to localStorage
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessTokenEncode));
    //refresh token
    this.startRefreshTokenTimer();
  }

  getAccesTokenFromLocalStorage() {
    const accessTokenEncodeJson = localStorage.getItem(ACCESS_TOKEN);

    if (accessTokenEncodeJson != null) {
      let accessTokenEncode = JSON.parse(accessTokenEncodeJson);
      return atob(accessTokenEncode);
    }
    return null;
  }

  private startRefreshTokenTimer() {
    //get new token when remain 2 mintutes
    const timeout =
      (this.EXPIRE_TOKEN_TIME_SECONDS -
        this.REMAIN_TIME_TO_REFRESH_TOKEN_SECONDS) *
      1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  //facebook login

  loginByFacebookAccount(): Observable<any> {
    // login with facebook then authenticate with the API to get a JWT auth token
    return this.facebookLogin()
      .pipe(concatMap((accessToken) => this.apiAuthenticateFB(accessToken)))
      .pipe(first());
  }

  facebookLogin(): Observable<any> {
    // login with facebook and return observable with fb access token on success
    return from(
      new Promise<fb.StatusResponse>((resolve) =>
        FB.login(resolve, {
          // scope: '',
          // return_scopes:true,
        })
      )
    ).pipe(
      concatMap(({ authResponse }) => {
        if (!authResponse) return EMPTY;
        return of(authResponse.accessToken);
      })
    );
  }

  apiAuthenticateFB(accessToken: string): Observable<any> {
    // authenticate with the api using a facebook access token,
    // on success the api returns an account object with a JWT auth token
    return this.httpClient
      .post<any>(routes.facebookAuthentication, accessToken)
      .pipe(
        map((res) => {
          if (res.status_code == 200) {
            const res_data = res.data
            //set user for global
            this.User = res.status_code == 200 ? res_data.user_infor : null;
            //set time to get new token(refresh token)
            //save expire token time
            this.EXPIRE_TOKEN_TIME_SECONDS =
              res_data.expire_token_time_minutes * 60;
            //encode acccess token
            let accessToken = res_data.access_token;
            this.saveAccessTokenInLocalStorage(accessToken);
          }
          return res;
        })
      );
  }

  logoutFBAccount() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    FB.api('/me/permissions', 'delete', null, () => FB.logout());
    // this.stopAuthenticateTimer();
    // this.accountSubject.next(null);
    // this.router.navigate(['/login']);
  }

  //
  updateUser(userBodyUpdate:User){
    let uri = routes.userInfor;
    return this.httpClient.patch(uri, userBodyUpdate).pipe(first());
  }
  ngOnDestroy() {
    this.stopRefreshTokenTimer();
  }
}
