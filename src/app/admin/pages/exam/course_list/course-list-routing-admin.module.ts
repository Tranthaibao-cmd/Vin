import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/guard/auth.guard";

import { CourseListAdminComponent } from "./course-list-admin.component";

const routes:Routes = [
    {
        path:'',
        component:CourseListAdminComponent,
        pathMatch:'full',
        canActivate:[AuthGuard]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CourseListAdminRoutingModule{}