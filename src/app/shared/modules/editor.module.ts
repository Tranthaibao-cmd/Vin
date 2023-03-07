import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorComponent } from '@shared/components/editor/editor.component';

@NgModule({
  imports: [AngularEditorModule, FormsModule, CommonModule],
  declarations: [EditorComponent],
  exports:[EditorComponent]
})
export class EditorModule {}
