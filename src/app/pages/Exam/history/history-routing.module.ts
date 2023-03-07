import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { HistoryComponent } from "./history.component";

const routes:Routes = [
    {
        path:'',
        component:HistoryComponent,
        canActivate:[AuthGuard],
        pathMatch:'full'
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class HistoryRoutingModule{}