import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CodingScreenRoutingModule } from './coding-screen-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CodingScreenComponent, OptionCodingEditor,DialogSubmit } from './coding-screen.component';
import { AngularSplitModule } from 'angular-split';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select'
import { ClockModule } from 'src/app/core/modules/clock.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CodingScreenRoutingModule,
    FormsModule,
    MatIconModule,
    MonacoEditorModule.forRoot(),
    AngularSplitModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ClockModule
  ],
  providers: [],
  bootstrap: [ CodingScreenComponent],
  declarations:[CodingScreenComponent,OptionCodingEditor,DialogSubmit]
})
export class CodingScreenModule{}
