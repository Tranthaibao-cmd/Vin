import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';

import { options } from './options';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent implements OnInit {
  
  user: any;
  options = options;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.getUser().subscribe((user: any) => {
      this.user = user;
    });
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
  }

  logOut() {
    this.authenticationService.logout();
  }
}
