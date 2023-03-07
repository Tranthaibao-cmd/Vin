import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { QuizComponent } from "./quiz.component";

const routes:Routes = [
    {
        path:'',
        component:QuizComponent,
        canActivate:[AuthGuard],
        pathMatch:'full',
        
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class QuizRoutingModule{}