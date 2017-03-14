import { NgModule } from '@angular/core';
import { HelpSupportComponent } from './help-support.component';
import { routing } from '../modules/about.routing';

@NgModule({
  imports: [routing],
  declarations: [HelpSupportComponent]
})

export class HelpSupportModule {
}
