import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { QuizHistoryListComponent } from "./quiz-history-list.component";

const routes:Routes = [
    {
        path:'',
        component:QuizHistoryListComponent,
        canActivate:[AuthGuard],
        pathMatch:'full'
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class QuizHistoryListRoutingModule{}