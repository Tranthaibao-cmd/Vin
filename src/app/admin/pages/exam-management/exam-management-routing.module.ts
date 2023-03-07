import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ExamManagementComponent } from './exam-management.component';

const routes: Routes = [
  {path: '', component: ExamManagementComponent, pathMatch: 'full'},
  {path: ':id', component: ExamManagementComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), MatDialogModule
  ],
  exports: [
    RouterModule
  ]
})
export class ExamManagementRoutingModule { }
