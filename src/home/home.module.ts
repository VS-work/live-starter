import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [SharedModule],
  providers: []
})
export class HomeModule {
}
