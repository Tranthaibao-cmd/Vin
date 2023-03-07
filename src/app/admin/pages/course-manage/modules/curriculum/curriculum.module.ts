import { NgModule } from '@angular/core';
import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { LectureComponent } from './components/lecture/lecture.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditorModule } from '@shared/modules/editor.module';
import { LectureCreationComponent } from './components/lecture-creation/lecture-creation.component';
import { CurriculumService } from './services/curriculum.service';

import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { AnswerOptionComponent } from './components/answer-option/answer-option.component';
import { NormalEditorModule } from '@shared/modules/normal-editor.module';
import { ContentComponent } from './components/content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionService } from './services/question.service';

import { ExerciseCreationComponent } from './components/exercise-creation/exercise-creation.component';
import { CodingCreationComponent } from './components/coding-creation/coding-creation.component';
import { CodingAddInputComponent } from './components/coding-add-input/coding-add-input.component';
import { FunctionService } from './services/function.service';
import { TestCaseComponent } from './components/testcase/testcase.component';
import { TestcaseCreationComponent } from './components/testcase-creation/testcase-creation.component';
import { TestcaseService } from './services/testcase.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderContentLayoutModule } from '../../core/modules/header-content-layout.module';
import { CourseCreationService } from '../../service/course-creation.service';
import { ContentTypePipe } from './pipes/content-type.pipe';

@NgModule({
  imports: [
    CurriculumRoutingModule,
    HeaderContentLayoutModule,
    DragDropModule,
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    EditorModule,
    NormalEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    CurriculumComponent,
    LectureComponent,
    LectureCreationComponent,
    ExerciseCreationComponent,
    QuizComponent,
    QuestionComponent,
    AnswerOptionComponent,
    ContentComponent,
    CodingCreationComponent,
    CodingAddInputComponent,
    TestCaseComponent,
    TestcaseCreationComponent,
    ContentTypePipe
  ],
  providers: [
    CurriculumService,
    CourseCreationService,
    QuestionService,
    FunctionService,
    TestcaseService
  ],
})
export class CurriculumModule {}
