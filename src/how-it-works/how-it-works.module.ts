import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { HowItWorksComponent } from './how-it-works.component';
import { routing } from '../modules/how-it-works.routing';
import { HowItWorksService } from './how-it-works.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    ButtonsModule.forRoot()
  ],
  providers: [HowItWorksService],
  declarations: [HowItWorksComponent]
})

export class HowItWorksModule {
}
