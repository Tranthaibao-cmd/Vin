import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizManagementComponent } from './quiz-management.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: QuizManagementComponent },
  { path: ':id', component: QuizManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatDialogModule],
  exports: [RouterModule]
})
export class QuizManagementRoutingModule { }
