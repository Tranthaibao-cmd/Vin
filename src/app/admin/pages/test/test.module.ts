import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MdlCountDownTimerModule } from "@core/modules/count-down-timer.module";
import { TestRoutingModule } from "./test-routing.module";
import { TestComponent } from "./test.component";

const MODULES = [TestRoutingModule,CommonModule,MdlCountDownTimerModule]
const COMPONENTS = [TestComponent]
@NgModule({
    declarations:[...COMPONENTS],
    imports:[...MODULES]
})
export class TestModule {

}
