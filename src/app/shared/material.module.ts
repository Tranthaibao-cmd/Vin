import { NgModule } from "@angular/core";
import {MatRadioModule} from '@angular/material/radio'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatButtonModule} from '@angular/material/button'
import {MatSortModule} from '@angular/material/sort'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
@NgModule({
    exports:[
        MatRadioModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatSortModule,
        MatInputModule,
        MatIconModule

    ]
})
export class MaterialModule{}