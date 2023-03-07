import { NgModule } from '@angular/core';

import { IntendedLearnersRoutingModule } from './intended-learners-routing.module';
import { IntendedLearnersComponent } from './intended-learners.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HeaderContentLayoutModule } from '../../core/modules/header-content-layout.module';

@NgModule({
  imports: [
    IntendedLearnersRoutingModule,
    HeaderContentLayoutModule,
    DragDropModule,
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  declarations: [IntendedLearnersComponent],
  // providers:[CourseCreationService]
})
export class IntendedLearnersModule {}
