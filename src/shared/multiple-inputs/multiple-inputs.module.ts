import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MultipleInputsComponent } from './multiple-inputs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [MultipleInputsComponent],
  exports: [MultipleInputsComponent]
})
export class MultipleInputsModule {

}
