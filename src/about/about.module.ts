import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import { routing } from '../modules/about.routing';

@NgModule({
  imports: [routing],
  declarations: [AboutComponent]
})

export class AboutModule {
}
