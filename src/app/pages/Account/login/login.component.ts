import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submited: boolean = false;
  is_error: boolean = false;
  returnUrl: any;
  fg: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fg = fb.group({
      //^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
      username: ['du99cy@gmail.com', Validators.compose([Validators.required])],
      password: ['123', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authenticationService.userValue) {
      this.router.navigateByUrl('admin');
    } else {
      this.returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl') || '/admin';
      console.log(this.returnUrl);
    }
  }

  get loginFormValue() {
    return this.fg.value;
  }

  toggleViewPassword(is_view_password: boolean) {
    if (is_view_password) {
      (
        document.getElementById('view_password') as HTMLInputElement
      ).style.display = 'block';
      (
        document.getElementById('hide_password') as HTMLInputElement
      ).style.display = 'none';
      (document.getElementById('password_input') as HTMLInputElement).type =
        'text';
    } else {
      (
        document.getElementById('view_password') as HTMLInputElement
      ).style.display = 'none';
      (
        document.getElementById('hide_password') as HTMLInputElement
      ).style.display = 'block';
      (document.getElementById('password_input') as HTMLInputElement).type =
        'password';
    }
  }

  login() {
    this.submited = true;
    this.authenticationService
      .login(this.loginFormValue)
      .pipe(first())
      .subscribe({

        next: (res: any) => {
          if(res.user_infor.role_id >2){
            alert("Bạn không quyền")
            return ;
          }
          this.submited = true;
          this.router.navigateByUrl(this.returnUrl);
          this.is_error = false;
        },
        error: (error: HttpErrorResponse) => {
          this.submited = false;
          console.error(error);
          this.is_error = true;
        },
      });
  }
}
