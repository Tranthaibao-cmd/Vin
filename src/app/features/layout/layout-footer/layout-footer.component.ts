import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss']
})
export class LayoutFooterComponent implements OnInit {
  currentYear:any;
  constructor() {
    this.currentYear = new Date().getFullYear();
   }

  ngOnInit(): void {
  }


}
