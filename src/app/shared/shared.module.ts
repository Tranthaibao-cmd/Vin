import { LayoutModule } from "@angular/cdk/layout";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { SyncfutionModule } from "./syncfution.module";

const SHARED_MODULES = [
    SyncfutionModule,
    LayoutModule,
    MaterialModule,
    FormsModule
]

@NgModule({
    exports:[SHARED_MODULES]
})
export class SharedModule{

}