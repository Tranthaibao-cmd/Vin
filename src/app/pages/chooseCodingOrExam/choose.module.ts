import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChooseRoutingModule } from './choose-routing.module';
import { ChooseComponent} from './choose.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChooseRoutingModule
    
  ],
  providers: [],
  bootstrap: [ ChooseComponent],
  declarations:[ChooseComponent]
})
export class ChooseModule{}
