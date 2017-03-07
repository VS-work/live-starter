import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ng2-bootstrap/accordion';

import { FAQComponent } from './faq.component';
import { GetFAQsService } from './faq.service';
import { routing } from '../modules/faq.routing';

@NgModule({
  declarations: [
    FAQComponent
  ],
  imports: [
    routing,
    CommonModule,
    AccordionModule.forRoot(),
    FormsModule
  ],
  providers: [GetFAQsService],
  exports: []
})

export class FAQModule {
}
