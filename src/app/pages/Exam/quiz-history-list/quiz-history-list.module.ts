import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { SharedPipeModule } from "src/app/core/pipes/shared-pipe.module";
import { SharedModule } from "src/app/shared/shared.module";
import { QuizHistoryListRoutingModule } from "./quiz-history-list-routing.module";
import { QuizHistoryListComponent } from "./quiz-history-list.component";

@NgModule({
    imports:[QuizHistoryListRoutingModule,CommonModule,SharedModule,SharedPipeModule,NgxSkeletonLoaderModule],
    declarations:[QuizHistoryListComponent]
})
export class QuizHistoryListModule{}