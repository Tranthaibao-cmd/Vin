import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/_services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  user: any;
  sideList: any = [
    {
      name: 'Danh sách lớp học',
      icon: 'class',
      path: '/admin/class-management',
    },
    // {name: 'Danh sách khóa học', icon: 'task', path: '/admin/subject-management'},

    {
      name: 'Danh sách người dùng',
      icon: 'person',
      path: '/admin/main-user-management',
    },
    /*   {name: 'Previlege', icon:'security',path:'/admin/previlege'} */
  ];
  roleLogin = false;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.userSubject.subscribe((res:any) => {
      //alert("okay")
      // this.user = res;
      this.roleLogin = res?.role_id == 0
    });
  }
}
