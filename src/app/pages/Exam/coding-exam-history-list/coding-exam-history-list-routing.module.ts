import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { CodingExamHistoryListComponent } from "./coding-exam-history-list.component";

const routes:Routes = [
    {
        path:'',
        component:CodingExamHistoryListComponent,
        canActivate:[AuthGuard],
        pathMatch:'full'
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CodingExamHistoryListRoutingModule{}