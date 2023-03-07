import { NgModule } from "@angular/core";
import { ClockComponent } from "@core/modules/components/clock/clock.component";

@NgModule({
    declarations:[ClockComponent],
    exports:[ClockComponent]
})
export class ClockModule{}
