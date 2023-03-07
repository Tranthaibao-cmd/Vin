import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  PreYScroll = window.pageYOffset
  constructor(private breakpointObserver:BreakpointObserver ) { }

  ngOnInit(): void {
    //this.view_1450()
  }

  // @HostListener('window:scroll',['$event'])
  // onScroll(event:any)
  // {
  //   var header = document.getElementById("header")
  //   var CurrentYScroll = window.pageYOffset
  //   if(this.PreYScroll < CurrentYScroll)
  //   {
  //     (header as HTMLInputElement).style.top = "-70px";
  //   }
  //   else
  //   {
  //     (header as HTMLInputElement).style.top = "0";
  //   }
  //   this.PreYScroll = CurrentYScroll
  // }


}
