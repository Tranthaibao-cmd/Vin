import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntendedLearnersComponent } from './intended-learners.component';

const routes: Routes = [{ path: '', component: IntendedLearnersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntendedLearnersRoutingModule {}
