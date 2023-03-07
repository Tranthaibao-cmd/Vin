import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsManagementComponent } from './subjects-management.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [{ path: '', component: SubjectsManagementComponent, pathMatch: 'full' }
  , ];

@NgModule({
  imports: [RouterModule.forChild(routes), MatDialogModule],
  exports: [RouterModule]
})
export class SubjectsManagementRoutingModule { }
