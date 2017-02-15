import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ng2-bootstrap/accordion';

import { FAQComponent } from './faq.component';
import { GetFAQsService } from './faq.service';

@NgModule({
  declarations: [
    FAQComponent
  ],
  imports: [
    BrowserModule,
    AccordionModule.forRoot(),
    FormsModule
  ],
  providers: [GetFAQsService],
  exports: []
})

export class FAQModule {
}
