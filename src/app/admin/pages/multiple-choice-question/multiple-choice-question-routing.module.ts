import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: MultipleChoiceQuestionComponent },
  { path: ':id', component: MultipleChoiceQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatDialogModule],
  exports: [RouterModule]
})
export class MultipleChoiceQuestionRoutingModule { }
