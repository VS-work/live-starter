import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { EventsListComponent } from './events-list.component';
import { SharedModule, SearchService } from '../shared';
import { routing } from '../modules/events-list.routing';

@NgModule({
  declarations: [
    EventsListComponent
  ],
  imports: [
    routing,
    FormsModule,
    CommonModule,
    ButtonsModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule
  ],
  providers: [
    SearchService
  ]
})

export class EventsListModule {
}
