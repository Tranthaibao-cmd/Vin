import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassManagementComponent } from './class-management.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TopicManagementComponent } from './topic-management/topic-management.component';


const routes: Routes = [

  { path: '', component: ClassManagementComponent },
  {
    path:':id',
    component:ClassManagementComponent
  },
  {
    path: 'topic',
    loadChildren: () =>import('./topic-management/topic.module').then(m =>m.TopicModule)
  },
  {
    path: 'detail/:newCourseId',
    loadChildren: () =>import('../course-manage/course-manage.module').then(m =>m.CourseManageModule)
  },
  {
    path: 'user-management',
    loadChildren: () =>import('../user-management/user-management.module').then(m =>m.UserManagementModule)
  },
  {
    path: 'exam-management',
    loadChildren: () =>import('../exam-management/exam-management.module').then(m =>m.ExamManagementModule)
  }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class ClassManagementRoutingModule {
}
