import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsManagementRoutingModule } from './subjects-management-routing.module';
import { SubjectsManagementComponent } from './subjects-management.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ManageSubjectDialogComponent } from './manage-subject-dialog/manage-subject-dialog.component';

const COMPONENTS = [SubjectsManagementComponent, ManageSubjectDialogComponent]
const MODULES = [
  CommonModule,
  SubjectsManagementRoutingModule,
  MaterialModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
]
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
})
export class SubjectsManagementModule { }
