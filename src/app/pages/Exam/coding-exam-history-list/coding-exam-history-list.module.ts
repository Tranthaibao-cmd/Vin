import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CodingExamHistoryListRoutingModule } from "./coding-exam-history-list-routing.module";
import { CodingExamHistoryListComponent } from "./coding-exam-history-list.component";

@NgModule({
    imports:[CommonModule,CodingExamHistoryListRoutingModule,SharedModule],
    declarations:[CodingExamHistoryListComponent]
})
export class CodingExamHistoryListModule{}