import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateExamComponent } from '../create-exam/create-exam.component';
import { ListExamRoutingModule } from './list-exam-routing.module';
import { ListExamComponent } from './list-exam.component';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar'
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ListExamRoutingModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule

  ],
  declarations: [ListExamComponent, CreateExamComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: [],
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: [],
    },
    {
      provide:MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue:[]
    }
  ],
  entryComponents: [CreateExamComponent],
})
export class ListExamModule {}
