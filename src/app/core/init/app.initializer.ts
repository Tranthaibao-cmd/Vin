import { AuthenticationService } from '@core/_services/authentication.service';
import { environment } from '@environment/environment';

export function appInitializer(authService: AuthenticationService) {
  return () => {
    new Promise((resolve:any, reject) => {
      //else check previous mail login then check access token that saved in local storage
      //get access token from localStorage
      let accessToken = authService.getAccesTokenFromLocalStorage();

      //if not null get refresh token and get user infor
      if (accessToken) {
        //get new token
        authService.refreshToken().subscribe((res) => {
          //get user information
          authService.userInfor().subscribe().add(resolve);
        });
      } else resolve();
    });
  };
}
