import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';
import { routing } from '../modules/home.routing';
import { FewShowsContainerModule } from '../shared/few-shows-container/few-shows-container.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    FewShowsContainerModule
  ],
  providers: []
})
export class HomeModule {
}
