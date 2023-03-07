import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InnerLayoutComponent } from './components/inner-layout/inner-layout.component';

@NgModule({
  declarations: [ InnerLayoutComponent ],
  exports: [InnerLayoutComponent]
})
export class InnerLayoutModule { }
