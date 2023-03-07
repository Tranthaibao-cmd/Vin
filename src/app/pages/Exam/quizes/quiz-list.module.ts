import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SanitizeHtmlPipe } from 'src/app/core/pipes/sanitize-html.pipe';
import { SharedPipeModule } from 'src/app/core/pipes/shared-pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuizListRoutingModule } from './quiz-list-routing.module';
import { QuizesComponent } from './quizes.component';

@NgModule({
  imports: [
    CommonModule,
    QuizListRoutingModule,
    SharedModule,
    SharedPipeModule,
    NgxSkeletonLoaderModule,
  ],
  declarations: [QuizesComponent],
})
export class QuizListModule {}
