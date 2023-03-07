import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrevilegeComponent } from './previlege.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [{ path: '', component: PrevilegeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), MatDialogModule],
  exports: [RouterModule]
})
export class PrevilegeRoutingModule { }
