import { AuthService } from "@admin/core/authentication/auth.service";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SanitizeHtmlPipe } from "@core/pipes/sanitize-html.pipe";
import { SharedPipeModule } from "@core/pipes/shared-pipe.module";
import { LayoutFooterComponent } from "./layout-footer/layout-footer.component";
import { LayoutHeaderComponent } from "./layout-header/layout-header.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";

const COMPONENTS = [LayoutComponent, LayoutFooterComponent, LayoutHeaderComponent]
const MODULES = [CommonModule, LayoutRoutingModule,SharedPipeModule]
const PIPES = []
@NgModule({
    declarations: [...COMPONENTS,],
    imports: [...MODULES],
    bootstrap:[LayoutComponent],
    providers:[AuthService]
}) export class LayoutModule {
} 