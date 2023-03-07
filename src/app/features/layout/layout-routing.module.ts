import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [

            {
                path: '',
                loadChildren: () =>
                    import('@user_pages/HomePages/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
            {
                path: 'course/quizzes/exam',
                loadChildren: () =>
                    import('@user_pages/Exam/quiz/quiz.module').then((m) => m.QuizModule),

            },

            {
                path: 'coding-exams/history',
                loadChildren: () =>
                    import(
                        '@user_pages/Exam/coding-exam-history-list/coding-exam-history-list.module'
                    ).then((m) => m.CodingExamHistoryListModule),
            },

            {
                path: 'course/:course_id/',
                loadChildren: () =>
                    import(
                        '@user_pages/Exam/quiz-history-list/quiz-history-list.module'
                    ).then((m) => m.QuizHistoryListModule),
            },
            {
                //path:"course/:course_id/quiz/:quiz_id/quiz_history/:object_id",
                path: 'multichoice-exam-history/:object_id',
                loadChildren: () =>
                    import('@user_pages/Exam/history/history.module').then(
                        (m) => m.HistoryModule
                    ),
            },
            {
                path: 'my-coding-exam-history/:object_id',
                loadChildren: () =>
                    import(
                        '@user_pages/Exam/my-coding-exam-history/my-coding-exam-history.module'
                    ).then((m) => m.MyCodingExamHistoryModule),
            },
            {
                path: 'course/quizes',
                loadChildren: () =>
                    import('@user_pages/Exam/quizes/quiz-list.module').then(
                        (m) => m.QuizListModule
                    ),
            },
            {
                path: 'exam_history/:object_id',
                loadChildren: () =>
                    import('@user_pages/Exam/all-exam-history/all-exam-history.module').then(
                        (m) => m.AllExamHistoryModule
                    ),
            },]
    }


]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {

}