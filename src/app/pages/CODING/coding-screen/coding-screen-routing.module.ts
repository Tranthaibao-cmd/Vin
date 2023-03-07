import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { CodingScreenComponent } from "./coding-screen.component";

const routes:Routes=[
    {
        path:'',
        component:CodingScreenComponent,
        pathMatch:'full',
        canActivate:[AuthGuard]
    }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CodingScreenRoutingModule{}