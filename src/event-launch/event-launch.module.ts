import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { LaunchComponent } from './event-launch.component';
import { routing } from '../modules/launch.routing';
import { EventService } from './event.service';
import { SharedModule, SearchService } from '../shared';

@NgModule({
  declarations: [
    LaunchComponent
  ],
  imports: [
    routing,
    HttpModule,
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ButtonsModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [EventService, SearchService],
  exports: [
    LaunchComponent
  ]
})

export class EventLaunchModule {
}
