import { NgModule } from '@angular/core';

import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from './statistics.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [StatisticsService],
  declarations: [StatisticsComponent],
  exports: [StatisticsComponent]
})

export class StatisticsModule {
}
