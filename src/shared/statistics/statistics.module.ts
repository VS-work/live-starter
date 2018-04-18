import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from './statistics.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    TooltipModule.forRoot()
  ],
  providers: [StatisticsService],
  declarations: [StatisticsComponent],
  exports: [StatisticsComponent]
})

export class StatisticsModule {
}
