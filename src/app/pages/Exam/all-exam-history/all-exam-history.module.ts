import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { SharedPipeModule } from "src/app/core/pipes/shared-pipe.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AllExamHistoryRoutingModule } from "./all-exam-history-routing.module";
import { AllExamHistoryComponent } from "./all-exam-history.component";

@NgModule({

    imports:[CommonModule,SharedModule,AllExamHistoryRoutingModule,SharedPipeModule,NgxSkeletonLoaderModule],
    declarations:[AllExamHistoryComponent]
})
export class AllExamHistoryModule{}