import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { LaunchComponent } from './event-launch.component';
import { routing } from '../modules/launch.routing';
import { EventService } from './event.service';
import { SharedModule, SearchService } from '../shared';
import { WowzaCloudModule } from '../shared/wowza-streaming-cloud/wowza-cloud.module';
import { FileUploaderModule } from '../shared/file-uploader/file-uploader.module';
import { MultipleInputsModule } from '../shared/multiple-inputs/multiple-inputs.module';
import { EventInfoModule } from '../shared/event-info/event-info.module';

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
    WowzaCloudModule,
    FileUploaderModule,
    MultipleInputsModule,
    EventInfoModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [EventService, SearchService],
  exports: [
    LaunchComponent
  ]
})

export class EventLaunchModule {
}
