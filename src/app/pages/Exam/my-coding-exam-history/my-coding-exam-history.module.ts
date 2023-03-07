import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedPipeModule } from "src/app/core/pipes/shared-pipe.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MyCodingExamHistoryRoutingModule } from "./my-coding-exam-history-routing.module";
import { MyCodingExamHistoryComponent } from "./my-coding-exam-history.component";

@NgModule({
    imports:[CommonModule,MyCodingExamHistoryRoutingModule,SharedPipeModule,SharedModule],
    declarations:[MyCodingExamHistoryComponent]
})
export class MyCodingExamHistoryModule{}