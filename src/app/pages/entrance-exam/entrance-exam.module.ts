import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntranceExamRoutingModule } from './entrance-exam-routing.module';
import { EntranceExamComponent} from './entrance-exam.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntranceExamRoutingModule
    
  ],
  providers: [],
  bootstrap: [ EntranceExamComponent],
  declarations:[EntranceExamComponent]
})
export class EntranceExamModule{}
