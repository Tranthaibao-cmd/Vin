import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/_services/authentication.service';
import { api_urls } from '@shared/api_url';

@Component({
    selector: 'moodle-admin-header',
    templateUrl: './header.component.html',
    styleUrls:['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

    @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

    constructor(private router: Router,private authenticationService: AuthenticationService) {}
    link = api_urls.LOCAL_API_URL
    user :any
    ngOnInit(): void {
      this.authenticationService.userSubject.subscribe(res=>{
        this.user =res

      })
    }

    toggleSidebar() {
      this.toggleSidebarForMe.emit();
    }
    logOut() {
      this.authenticationService.logout();
    }

}
