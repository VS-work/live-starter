import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from '../modules/manage-live-stream.routing';
import { ShowService } from '../shared/show-service/show.service';
import { WowzaPlayerModule } from '../shared/wowza-streaming-cloud/wowza-player/wowza-player.module';
import { ListOfEncodersModule } from '../shared/wowza-streaming-cloud/list-of-encoders/list-of-encoders.module';
import { ManageLiveStreamComponent } from './manage-live-stream.component';
import { WowzaCloudService } from '../shared/wowza-streaming-cloud/wowza-cloud.service';

@NgModule({
  imports: [
    routing,
    CommonModule,
    WowzaPlayerModule,
    ListOfEncodersModule,
  ],
  providers: [
    ShowService,
    WowzaCloudService
  ],
  declarations: [
    ManageLiveStreamComponent
  ]
})

export class ManageLiveStreamModule {
}
