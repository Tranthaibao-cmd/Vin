import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/modules/material.module';
import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseService } from './services/course.service';

@NgModule({
  declarations: [CourseComponent],
  imports: [CommonModule, CourseRoutingModule, MaterialModule, ReactiveFormsModule, FormsModule],
  providers: [CourseService],
})
export class CourseModule {}
