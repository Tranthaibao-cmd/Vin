import { Component } from "@angular/core";

@Component({
    selector:'moodle-admin',
    templateUrl:'./admin-layout.component.html',
    styleUrls:['./admin-layout.component.scss']

})
export class AdminLayoutComponent{
    title = 'Company';
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}