import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EventsListComponent } from './events-list.component';
import { GetEventsListService } from './events-list.service';

@NgModule({
  declarations: [
    EventsListComponent
  ],
  imports: [BrowserModule],
  providers: [GetEventsListService],
  exports: []
})

export class EventsListModule {
}
