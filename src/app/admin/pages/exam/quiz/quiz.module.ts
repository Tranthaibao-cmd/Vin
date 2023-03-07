import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { QuizCreateComponent } from './create-quiz/quiz-create.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar' ;
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DauVaoFormComponent } from './dau-vao/dau-vao-form/dau-vao-form.component';
import { DauVaoTableComponent } from './dau-vao/dau-vao-table/dau-vao-table.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    QuizRoutingModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule

  ],
  declarations: [QuizCreateComponent, ListQuizComponent, DauVaoFormComponent,DauVaoTableComponent],
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
})
export class QuizCreateModule {}
