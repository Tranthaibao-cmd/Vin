import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { NetworkAwarePreloadingStrategyService } from '@core/_services/network-aware-preloading-strategy.service';
import { AdminLayoutComponent } from './admin-layout.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,

    children: [
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('../../pages/test/test.module').then((m) => m.TestModule),
      // },
      {
        path: 'class-management',
        loadChildren: () =>
          import('../../pages/class-management/class-management.module').then(
            (m) => m.ClassManagementModule
          ),
      },
      {
        path:'',
        redirectTo:'class-management',
        pathMatch:'full'
      },
      {
        path: 'course-list',
        loadChildren: () =>
          import('../../pages/exam/course_list/course-list-admin.module').then(
            (m) => m.CourseListAdminModule
          ),
      },
      {
        path: 'subject-management',
        loadChildren: () =>
          import(
            '../../pages/subjects-management/subjects-management.module'
          ).then((m) => m.SubjectsManagementModule),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../../pages/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'main-user-management',
        loadChildren: () =>
          import(
            '../../pages/main-user-management/main-user-management.module'
          ).then((m) => m.MainUserManagementModule),
      },
      {
        path: 'exam-management',
        loadChildren: () =>
          import('../../pages/exam-management/exam-management.module').then(
            (m) => m.ExamManagementModule
          ),
      },
      {
        path: 'quiz-management',
        loadChildren: () =>
          import('../../pages/quiz-management/quiz-management.module').then(
            (m) => m.QuizManagementModule
          ),
      },
      {
        path: 'choice-question-management',
        loadChildren: () =>
          import(
            '../../pages/multiple-choice-question/multiple-choice-question.module'
          ).then((m) => m.MultipleChoiceQuestionModule),
      },
      // {
      //   path: 'topic',
      //   loadChildren: () => import('../../pages/class-management/topic-management/topic.module').then(m => m.TopicModule)
      // },
      {
        path: 'previlege',
        loadChildren: () =>
          import('../../pages/previlege/previlege.module').then(
            (m) => m.PrevilegeModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
