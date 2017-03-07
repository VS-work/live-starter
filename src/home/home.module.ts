import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';
import { routing } from '../modules/home.routing';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    routing,
    SharedModule],
  providers: []
})
export class HomeModule {
}
