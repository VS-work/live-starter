import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LaunchComponent } from './event-launch.component';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonsModule, DatepickerModule } from 'ng2-bootstrap';
import { EventService } from './event.service';

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
    ButtonsModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  providers: [EventService],
  exports: [
    LaunchComponent
  ]
})

export class EventLaunchModule {

}
