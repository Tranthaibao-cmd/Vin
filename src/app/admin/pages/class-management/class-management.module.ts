import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassManagementRoutingModule } from './class-management-routing.module';
import { ClassManagementComponent } from './class-management.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ManageClassDialogComponent } from './manage-class-dialog/manage-class-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassManagementService } from '../../core/service/class-management.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { CourseStatusPipe } from './course-status.pipe';
import { CourseTypePipe } from './course-type.pipe';

const COMPONENTS = [ClassManagementComponent, ManageClassDialogComponent, CourseStatusPipe,CourseTypePipe]
const MODULES = [
    CommonModule,
    ClassManagementRoutingModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule
]

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS],
  providers: [ClassManagementService],
})
export class ClassManagementModule {}
