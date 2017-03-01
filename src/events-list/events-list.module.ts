import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';

import { EventsListComponent } from './events-list.component';
import { GetEventsListService } from './events-list.service';
import { SharedModule, SearchService } from '../shared';

@NgModule({
  declarations: [
    EventsListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ButtonsModule.forRoot(),
    DatepickerModule.forRoot(),
    DropdownModule.forRoot(),
    SharedModule
  ],
  providers: [
    GetEventsListService,
    SearchService
  ],
  exports: []
})

export class EventsListModule {
}
