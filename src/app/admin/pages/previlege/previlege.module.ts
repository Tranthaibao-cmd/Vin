import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrevilegeRoutingModule } from './previlege-routing.module';
import { PrevilegeComponent } from './previlege.component';
import { InnerLayoutModule } from '@admin/core/modules/inner-layout.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { PrevilegeDialogComponent } from './previlege-dialog/previlege-dialog.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    PrevilegeComponent,
    PrevilegeDialogComponent
  ],
  imports: [
    CommonModule,
    PrevilegeRoutingModule,
    InnerLayoutModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,ReactiveFormsModule,
    MatSelectModule
  ]
})
export class PrevilegeModule { }
