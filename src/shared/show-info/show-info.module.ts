import { NgModule } from '@angular/core';

import { ShowInfoComponent } from './show-info.component';
import { StatisticsModule } from '../statistics/statistics.module';
import { FundingContainerModule } from '../funding-container/funding-container.module';
import { CommonModule } from '@angular/common';
import { FollowModule } from '../follow/follow.module';
import { PurchaseContainerModule } from '../purchase-container/purchase-container.module';

@NgModule({
  imports: [
    CommonModule,
    StatisticsModule,
    FundingContainerModule,
    FollowModule,
    PurchaseContainerModule
  ],
  declarations: [ShowInfoComponent],
  exports: [ShowInfoComponent]
})

export class ShowInfoModule {
}
