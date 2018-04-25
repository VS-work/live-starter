import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { LaunchComponent } from './event-launch.component';
import { routing } from '../modules/launch.routing';
import { SharedModule, SearchService } from '../shared';

import { FileUploaderModule } from '../shared/file-uploader/file-uploader.module';
import { MultipleInputsModule } from '../shared/multiple-inputs/multiple-inputs.module';
import { EventInfoModule } from '../shared/event-info/event-info.module';
import { ListOfEncodersModule } from '../shared/wowza-streaming-cloud/list-of-encoders/list-of-encoders.module';
import { WowzaCloudService } from '../shared/wowza-streaming-cloud/wowza-cloud.service';
import { LocationService, OembedService } from '../shared/services';
import { ShowService } from '../shared/show-service/show.service';

@NgModule({
  declarations: [
    LaunchComponent
  ],
  imports: [
    routing,
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ListOfEncodersModule,
    FileUploaderModule,
    MultipleInputsModule,
    EventInfoModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    ShowService,
    SearchService,
    WowzaCloudService,
    LocationService,
    OembedService
  ],
  exports: [
    LaunchComponent
  ]
})

export class EventLaunchModule {
}
