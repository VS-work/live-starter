import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventInfoComponent } from './event-info.component';
import { StatisticsModule } from '../statistics/statistics.module';
import { FundingContainerModule } from '../funding-container/funding-container.module';

@NgModule({
  imports: [
    CommonModule,
    StatisticsModule,
    FundingContainerModule
  ],
  declarations: [EventInfoComponent],
  exports: [EventInfoComponent]
})

export class EventInfoModule {
}
