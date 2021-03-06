import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ShowPageComponent } from './show-page.component';
import { routing } from '../modules/show-page.routing';
import { StatisticsModule } from '../shared/statistics/statistics.module';
import { EventInfoModule } from '../shared/event-info/event-info.module';
import { TimerModule } from '../shared/timer/timer.module';
import { ShareContainerModule } from '../shared/share-container/share-container.module';
import { PurchaseContainerModule } from '../shared/purchase-container/purchase-container.module';
import { TipsContainerModule } from '../shared/tips-container/tips-container.module';
import { WowzaCloudService } from '../shared/wowza-streaming-cloud/wowza-cloud.service';
import { EmbedFileContainerModule } from '../shared/embed-files-container/embed-file-container.module';

@NgModule({
  declarations: [
    ShowPageComponent
  ],
  providers: [
    WowzaCloudService,
  ],
  imports: [
    routing,
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    StatisticsModule,
    EventInfoModule,
    TimerModule,
    ShareContainerModule,
    PurchaseContainerModule,
    TipsContainerModule,
    EmbedFileContainerModule
  ]
})

export class ShowPageModule {
}
