import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedPipeModule } from 'src/app/core/pipes/shared-pipe.module';
import { CourseListAdminComponent } from './course-list-admin.component';
import { CourseListAdminRoutingModule } from './course-list-routing-admin.module';
import { CourseListService } from './course-list.service';

@NgModule({
  declarations: [CourseListAdminComponent],
  imports: [
    CommonModule,
    CourseListAdminRoutingModule,
    NgxSkeletonLoaderModule,
    MaterialModule,
    SharedPipeModule,
  ],
})
export class CourseListAdminModule {}
