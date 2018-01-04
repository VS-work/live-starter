import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from './statistics.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [StatisticsService],
  declarations: [StatisticsComponent],
  exports: [StatisticsComponent]
})

export class StatisticsModule {
}
