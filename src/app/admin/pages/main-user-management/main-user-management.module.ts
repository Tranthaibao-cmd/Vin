import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainUserManagementRoutingModule } from './main-user-management-routing.module';
import { MainUserManagementComponent } from './main-user-management.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ManageMainUserDialogComponent } from './manage-main-user-dialog/manage-main-user-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ChangePassComponent } from './change-pass/change-pass.component';

import { ImportUserDialogComponent } from './import-user-dialog/import-user-dialog.component';
import { UseRolePipe } from './user-role.pipe';

@NgModule({
  declarations: [
    MainUserManagementComponent,
    ManageMainUserDialogComponent,
    ChangePassComponent,
    ImportUserDialogComponent, 
    UseRolePipe
  ],
  imports: [
    CommonModule,
    MainUserManagementRoutingModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ]
})
export class MainUserManagementModule { }
