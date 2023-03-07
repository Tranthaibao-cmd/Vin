import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleChoiceQuestionRoutingModule } from './multiple-choice-question-routing.module';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question.component';
import { MultipleChoiceDialogComponent } from './multiple-choice-dialog/multiple-choice-dialog.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { UploadQuesDialogComponent } from './upload-ques-dialog/upload-ques-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { AnswerComponent } from './answer/answer.component';
import { AnswerDialogComponent } from './answer/answer-dialog/answer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'


@NgModule({
  declarations: [
    MultipleChoiceQuestionComponent,
    MultipleChoiceDialogComponent,
    UploadQuesDialogComponent,
    AnswerComponent,
    AnswerDialogComponent
  ],
  imports: [
    CommonModule,
    MultipleChoiceQuestionRoutingModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class MultipleChoiceQuestionModule { }
