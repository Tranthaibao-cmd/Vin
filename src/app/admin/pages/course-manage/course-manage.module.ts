import { NgModule } from '@angular/core';

import { CourseManageRoutingModule } from './course-manage-routing.module';
import { LayoutManageComponent } from './core/components/layout-manage/layout-manage.component';
import { MatIconModule } from '@angular/material/icon';
import { CourseStructureComponent } from './modules/course-structure/course-structure.component';
import { SetupTestComponent } from './modules/setup-test/setup-test.component';
import { CourseMessagesComponent } from './modules/course-messages/course-messages.component';
import { FilmEditComponent } from './modules/film-edit/film-edit.component';
import { HeaderContentLayoutModule } from './core/modules/header-content-layout.module';
import { PricingComponent } from './modules/pricing/pricing.component';
import { FormsModule } from '@angular/forms';
import { CannotSubmitForReviewComponent } from './core/components/cannot-submit-for-review-notifacation-dialog/cannot-submit-for-review.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CourseStatusBtnPipe } from './core/pipes/course-status-btn.pipe';

@NgModule({
  imports: [
    CourseManageRoutingModule,
    MatIconModule,
    HeaderContentLayoutModule,
    FormsModule,
    MatDialogModule,
    CommonModule
  ],
  declarations: [
    LayoutManageComponent,
    CourseStructureComponent,
    SetupTestComponent,
    CourseMessagesComponent,
    FilmEditComponent,
    PricingComponent,
    CannotSubmitForReviewComponent,
    CourseStatusBtnPipe
  ],
})
export class CourseManageModule {}
