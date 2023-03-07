import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NormalEditorComponent } from '@shared/components/normal-editor/normal-editor.component';



@NgModule({
  imports: [AngularEditorModule,FormsModule ],
  declarations: [ NormalEditorComponent ],
  exports: [NormalEditorComponent]
})
export class NormalEditorModule { }
