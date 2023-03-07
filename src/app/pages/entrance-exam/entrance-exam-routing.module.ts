import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { EntranceExamComponent} from "./entrance-exam.component";

const routes:Routes=[
    {
        path:'',
        component:EntranceExamComponent,
        pathMatch:'full',
        canActivate:[AuthGuard]
    }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class EntranceExamRoutingModule{}