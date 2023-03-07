import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamManagementRoutingModule } from './exam-management-routing.module';
import { ExamManagementComponent } from './exam-management.component';
import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const COMPONENTS = [ExamManagementComponent, ExamDialogComponent]
const MODULES = [
  CommonModule,
  ExamManagementRoutingModule,
  MaterialModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatAutocompleteModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
})
export class ExamManagementModule { }
