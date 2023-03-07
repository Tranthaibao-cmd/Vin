import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizManagementRoutingModule } from './quiz-management-routing.module';
import { QuizManagementComponent } from './quiz-management.component';
import { QuizDialogComponent } from './quiz-dialog/quiz-dialog.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    QuizManagementComponent,
    QuizDialogComponent
  ],
  imports: [
    CommonModule,
    QuizManagementRoutingModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class QuizManagementModule { }
