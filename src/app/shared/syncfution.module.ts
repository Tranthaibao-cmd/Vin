import { NgModule } from "@angular/core";
import {CheckBoxModule, RadioButtonModule} from '@syncfusion/ej2-angular-buttons';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
@NgModule({
    exports:[RadioButtonModule,
    CheckBoxModule, DateTimePickerModule],
    providers:[]
})
export class SyncfutionModule {}