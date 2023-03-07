import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/guard/auth.guard";

import { TestCaseComponent } from "./test-case.component";

const routes:Routes=[
    {
        path:'',
        component:TestCaseComponent,
        pathMatch:'full',
        canActivate:[AuthGuard]
    }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class TestCaseRoutingModule{}