import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { SharedPipeModule } from 'src/app/core/pipes/shared-pipe.module';
import { FormsModule } from '@angular/forms';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ClockModule } from 'src/app/core/modules/clock.module';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { FileModule } from '@core/modules/file.module';

@NgModule({
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    SharedPipeModule,
    FormsModule,
    FileModule,
    ClockModule,
    NgxSkeletonLoaderModule,
    MatProgressBarModule
  ],
  declarations: [QuizComponent],
})
export class QuizModule {}
