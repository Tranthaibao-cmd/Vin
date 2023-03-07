import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AdminRoutingModule } from "./admin-layout-routing.module";
import { AdminLayoutComponent } from "./admin-layout.component";
import { AdminFooterComponent } from "./footer/footer.component";
import { AdminHeaderComponent } from "./header/header.component";
import { SidenavComponent } from './sidenav/sidenav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

const MODULES = [AdminRoutingModule,CommonModule, MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,]
const COMPONENTS = [
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    SidenavComponent]
@NgModule({
    declarations:[...COMPONENTS ],
    imports: [...MODULES]
})
export class AdminModule {

}
