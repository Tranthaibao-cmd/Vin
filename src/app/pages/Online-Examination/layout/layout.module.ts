import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { UserInforComponent } from '../components/user-infor/user-infor.component';
import { QuestionsListNumbersComponent } from '../components/questions-list-numbers/questions-list-numbers.component';
import { TheoryPartComponent } from '../components/theory-part/theory-part.component';
import { PraticePartComponent } from '../components/pratice-part/pratice-part.component';


@NgModule({
  declarations: [
    LayoutComponent,
    UserInforComponent,
    QuestionsListNumbersComponent,
    TheoryPartComponent,
    PraticePartComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
