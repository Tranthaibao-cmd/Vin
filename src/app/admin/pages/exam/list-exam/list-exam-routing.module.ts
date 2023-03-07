import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";


import { ListExamComponent } from "./list-exam.component";

const routes:Routes=[
    {
        path:':course_id',
        component:ListExamComponent,
        pathMatch:'full',
        canActivate:[AuthGuard]
    }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ListExamRoutingModule{}