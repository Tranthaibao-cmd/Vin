import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumComponent } from './modules/curriculum/components/curriculum/curriculum.component';
import { IntendedLearnersComponent } from './modules/intended-learners/intended-learners.component';
import { LayoutManageComponent } from './core/components/layout-manage/layout-manage.component'
import { CourseLandingPageComponent } from './modules/course-landing-page/course-landing-page.component';
import { CourseMessagesComponent } from './modules/course-messages/course-messages.component';
import { CourseStructureComponent } from './modules/course-structure/course-structure.component';
import { FilmEditComponent } from './modules/film-edit/film-edit.component';
import { PricingComponent } from './modules/pricing/pricing.component';
import { SetupTestComponent } from './modules/setup-test/setup-test.component';


const routes: Routes = [
  {
    path:'',
    component: LayoutManageComponent,
    children:[
      {
        path: 'intended-learners', // child route path
        loadChildren:() =>import('./modules/intended-learners/intended-learners.module').then(m=>m.IntendedLearnersModule)
      },
      {
        path: 'curriculum', // child route path
        loadChildren: () =>import('./modules/curriculum/curriculum.module').then(m=>m.CurriculumModule)
      },
      {
        path: 'course-landing-page', // child route path
        loadChildren: () =>import('./modules/course-landing-page/course-landing-page.module').then(m=>m.CourseLandingPageModule)
      },
      {
        path: 'course-messages', // child route path
        component: CourseMessagesComponent
      },
      {
        path: 'course-structure', // child route path
        component: CourseStructureComponent
      },
      {
        path: 'film-edit', // child route path
        component: FilmEditComponent
      },
      {
        path: 'pricing', // child route path
        component: PricingComponent
      },
      {
        path: 'setup-test', // child route path
        component: SetupTestComponent
      },
      {
        path: '',
        redirectTo:'intended-learners'
      }

  ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CourseManageRoutingModule {
}
