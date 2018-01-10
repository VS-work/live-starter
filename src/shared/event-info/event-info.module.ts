import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventInfoComponent } from './event-info.component';
import { StatisticsModule } from '../statistics/statistics.module';
import { FundingContainerModule } from '../funding-container/funding-container.module';
import { FollowModule } from '../follow/follow.module';

@NgModule({
  imports: [
    CommonModule,
    StatisticsModule,
    FundingContainerModule,
    FollowModule
  ],
  declarations: [EventInfoComponent],
  exports: [EventInfoComponent]
})

export class EventInfoModule {
}
