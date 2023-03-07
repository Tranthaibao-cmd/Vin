import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { sharedTestComponent } from '@shared/components/test/test.component';

@NgModule({
  imports: [MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule],
  declarations: [sharedTestComponent],
  exports: [
    sharedTestComponent,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class sharedTestModule {}
