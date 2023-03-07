import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainUserManagementComponent } from './main-user-management.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: MainUserManagementComponent },
  { path: ':id', component: MainUserManagementComponent },
  {
    path: 'user-management',
    loadChildren: () =>import('../user-management/user-management.module').then(m =>m.UserManagementModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MatDialogModule],
  exports: [RouterModule]
})
export class MainUserManagementRoutingModule { }
