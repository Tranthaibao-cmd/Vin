import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LayoutComponent } from '@features/layout/layout.component';

import { NetworkAwarePreloadingStrategyService } from './core/_services/network-aware-preloading-strategy.service';
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  preloadingStrategy: NetworkAwarePreloadingStrategyService
};

const routes: Routes = [

  //for admin

  {
    path: 'admin',
    loadChildren: () =>
      import('@admin/features/layout/admin-layout.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/Account/login/login.module').then((m) => m.LoginModule),
  },
  {
    path:'',
    redirectTo:"login",
    pathMatch:"full"
  },
  //for uesr
  {
    path: '',
    loadChildren: () =>
      import('@features/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./pages/error-pages/error/error.module').then(
        (m) => m.ErrorModule
      ),
  },
  {
    path: 'entrance-exam/:id_ky_thi',
    loadChildren: () =>
      import('./pages/CODING/coding-screen/coding-screen.module').then(
        (m) => m.CodingScreenModule
      ),
  },
  {
    path: 'choose-exam-test',
    loadChildren: () =>
      import('./pages/chooseCodingOrExam/choose.module').then(
        (m) => m.ChooseModule
      ),
  },
  {
    path: 'entrance-exam-list',
    loadChildren: () =>
      import('./pages/entrance-exam/entrance-exam.module').then(
        (m) => m.EntranceExamModule
      ),
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./pages/test/test.module').then((m) => m.TestModule),
  },
  {
    path: 'online-examination',
    loadChildren: () =>
      import('./pages/Online-Examination/layout/layout.module').then(
        (m) => m.LayoutModule
      ),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,routingConfiguration),

  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
