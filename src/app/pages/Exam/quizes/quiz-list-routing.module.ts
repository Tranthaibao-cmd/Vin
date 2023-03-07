import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { QuizesComponent } from "./quizes.component";

const routes:Routes = [
    {
        path:'',
        component:QuizesComponent,
        pathMatch:'full',
        canActivate:[AuthGuard]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class QuizListRoutingModule{}