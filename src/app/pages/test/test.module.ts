import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TestRoutingModule } from "./test-routing.module";
import { TestComponent, } from "./test.component";
import {MatSnackBar, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar'
import { MatButtonModule} from '@angular/material/button'
import { FileModule } from "@core/modules/file.module";
import { NormalEditorModule } from '../../shared/modules/normal-editor.module';
@NgModule({
    declarations:[TestComponent],
    imports:[CommonModule,TestRoutingModule,MatSnackBarModule,MatButtonModule,FileModule,NormalEditorModule],
    providers:[
        {
            provide:MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue:{duration: 2500}
        },
        // {
        //     provide:MatSnackBar,
        //     useValue:[]
        // }
    ]
})
export class TestModule{

}
