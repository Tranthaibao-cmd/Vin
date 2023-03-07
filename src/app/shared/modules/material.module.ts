import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  exports: [
    MatFormFieldModule,
    MatSlideToggleModule,
    MatIconModule,
    MatPasswordStrengthModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
})
export class MaterialModule {}
