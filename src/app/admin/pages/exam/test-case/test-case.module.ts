import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestCaseRoutingModule } from './test-case-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { TestCaseComponent } from './test-case.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { FormDauVaoComponent } from './form-nhap-gia-tri-dau-vao/form-dau-vao.component';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TestCaseRoutingModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  declarations: [TestCaseComponent, FormDauVaoComponent],
  entryComponents: [FormDauVaoComponent],
  providers: [
    {
      //set hasBackdrop :false if dont want to close diolog once click out of dialog component area
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true },
    },
    
  ],
})
export class TestCaseModule {}
