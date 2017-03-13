import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowItWorksComponent } from './how-it-works.component';
import { routing } from '../modules/how-it-works.routing';

@NgModule({
  imports: [CommonModule, routing],
  declarations: [HowItWorksComponent]
})

export class HowItWorksModule {
}
