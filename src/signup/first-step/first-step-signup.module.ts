import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FirstStepComponent } from './first-step.component';
import { routing } from '../../modules/signup-first-step.routing';

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule
  ],
  declarations: [FirstStepComponent]
})

export class SignupFirstStepModule {
}
