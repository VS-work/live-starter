import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SecondStepComponent } from './second-step.component';
import { routing } from '../../modules/signup-second-step.routing';

@NgModule({
  imports: [
    routing,
    CommonModule,
    FormsModule
  ],
  declarations: [SecondStepComponent]
})

export class SignupSecondStepModule {
}
