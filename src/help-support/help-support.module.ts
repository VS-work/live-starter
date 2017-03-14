import { NgModule } from '@angular/core';
import { HelpSupportComponent } from './help-support.component';
import { routing } from '../modules/help-support.routing';

@NgModule({
  imports: [routing],
  declarations: [HelpSupportComponent]
})

export class HelpSupportModule {
}
