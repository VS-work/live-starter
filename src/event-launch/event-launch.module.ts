import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LaunchComponent } from './event-launch.component';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { EventService } from './event.service';
import { SharedModule, SearchService } from '../shared';
import { routing } from '../modules/launch.routing';

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
    DropdownModule.forRoot()
  ],
  providers: [EventService, SearchService],
  exports: [
    LaunchComponent
  ]
})

export class EventLaunchModule {
}
