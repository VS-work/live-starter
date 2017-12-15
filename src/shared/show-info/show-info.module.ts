import { NgModule } from '@angular/core';

import { ShowInfoComponent } from './show-info.component';
import { StatisticsModule } from '../statistics/statistics.module';
import { FundingContainerModule } from '../funding-container/funding-container.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    StatisticsModule,
    FundingContainerModule
  ],
  declarations: [ShowInfoComponent],
  exports: [ShowInfoComponent]
})

export class ShowInfoModule {
}
