import { NgModule } from "@angular/core";
import { SanitizeHtmlPipe } from "./sanitize-html.pipe";

@NgModule({
    imports:[],
    declarations:[SanitizeHtmlPipe],
    exports:[SanitizeHtmlPipe]
})
export class SharedPipeModule{}