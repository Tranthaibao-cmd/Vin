import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AllExamHistoryComponent } from './all-exam-history.component';

const routes: Routes = [
  {
    path: '',
    component: AllExamHistoryComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllExamHistoryRoutingModule {}
