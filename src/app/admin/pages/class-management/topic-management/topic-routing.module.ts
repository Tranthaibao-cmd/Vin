import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { TopicManagementComponent } from './topic-management.component';

const routes: Routes = [
 
  
  { path: ':id',
  component: TopicManagementComponent,
  
  //canActivate:[AuthGuard],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicRoutingModule {}
