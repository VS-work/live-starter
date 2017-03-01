import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LaunchComponent } from './event-launch.component';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { EventService } from './event.service';
import { SharedModule, SearchService } from '../shared';

@NgModule({
  declarations: [
    LaunchComponent
  ],
  imports: [
    HttpModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ButtonsModule.forRoot(),
    DatepickerModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [EventService, SearchService],
  exports: [
    LaunchComponent
  ]
})

export class EventLaunchModule {

}
