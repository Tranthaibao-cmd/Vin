import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLandingPageComponent } from './course-landing-page.component';


const routes: Routes = [{ path: '', component: CourseLandingPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseLandingPageRoutingModule {}
