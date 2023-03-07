import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { TopicManagementDialogComponent } from './components/topic-management-dialog/topic-management-dialog.component';
import { TopicManagementComponent } from './topic-management.component';
import { TopicRoutingModule } from './topic-routing.module';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { MatExpansionModule } from '@angular/material/expansion';
import { TopicComponent } from './components/topic/topic.component';


@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    TopicRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    RichTextEditorModule,
    MatExpansionModule
  ],
  declarations: [TopicManagementDialogComponent, TopicManagementComponent,TopicComponent],
  providers: [
    {
      provide:MAT_DIALOG_DEFAULT_OPTIONS,useValue:{hasBackdrop:true}
    }
  ]
})
export class TopicModule {}
