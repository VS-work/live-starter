import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { routing } from '../modules/fan-profile.routing';
import { FanProfileComponent } from './fan-profile.component';
import { ShowInfoModule } from '../shared/show-info/show-info.module';
import { FollowModule } from '../shared/follow/follow.module';
import { StatisticsModule } from '../shared/statistics/statistics.module';

@NgModule({
  declarations: [
    FanProfileComponent,
 ],
  imports: [
    routing,
    CommonModule,
    TabsModule.forRoot(),
    ShowInfoModule,
    FollowModule,
    StatisticsModule
  ],
  providers: [],
  exports: []
})
export class FanProfileModule {
}
