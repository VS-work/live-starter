import { NgModule } from '@angular/core';

import { MyEventsComponent } from './my-events.component';
import { routing } from '../modules/my-events.routing';
import { MyEventPageComponent } from './my-event-page/my-event-page.component';
import { WowzaCloudModule } from '../shared/wowza-streaming-cloud/wowza-cloud.module';

@NgModule({
  imports: [
    routing,
    WowzaCloudModule,
  ],
  declarations: [
    MyEventsComponent,
    MyEventPageComponent
  ]
})

export class MyEventsModule {
}
