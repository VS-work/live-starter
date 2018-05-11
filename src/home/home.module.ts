import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';
import { routing } from '../modules/home.routing';
import { FewShowsContainerModule } from '../shared/few-shows-container/few-shows-container.module';
import { WhatTheySayModule } from '../shared/what-they-say/what-they-say.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    FewShowsContainerModule,
    WhatTheySayModule
  ],
  providers: []
})
export class HomeModule {
}
