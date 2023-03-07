import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { SharedPipeModule } from "src/app/core/pipes/shared-pipe.module";
import { SharedModule } from "src/app/shared/shared.module";
import { HistoryRoutingModule } from "./history-routing.module";
import { HistoryComponent } from "./history.component";

@NgModule({
    imports:[CommonModule,SharedPipeModule,HistoryRoutingModule,SharedModule,NgxSkeletonLoaderModule],
    declarations:[HistoryComponent]
})
export class HistoryModule{}