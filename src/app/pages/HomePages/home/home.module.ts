import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CourseListComponent } from '../course-list/course-list.component';
import { CourseComponent } from '../course/course.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [HomeRoutingModule, SlickCarouselModule,CommonModule,NgxSkeletonLoaderModule],
  declarations: [HomeComponent, CourseListComponent, CourseComponent]
})
export class HomeModule {}
