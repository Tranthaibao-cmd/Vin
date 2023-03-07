import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/guard/auth.guard";

import { ListQuizComponent } from "./list-quiz/list-quiz.component";


const routes:Routes=[
    {
        path:'',
        component:ListQuizComponent,
        pathMatch:'full',
        canActivate:[AuthGuard]
    }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class QuizRoutingModule{}