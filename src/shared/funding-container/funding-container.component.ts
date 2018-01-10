import { Component, Input } from '@angular/core';

import { Funding } from './funding.interface';

@Component({
  selector: 'app-funding-container',
  templateUrl: './funding-container.component.html',
  styleUrls: ['./funding-container.component.scss']
})
export class FundingContainerComponent {
  @Input() set fundingParams(params: Funding){
    if (!params) {
      return;
    }
    this.funding = params;
    const funded = (params.ticketsSold / params.ticketsToFund) * 100;
    this.funding.fundedPercentage = isNaN(funded) ? 0 : funded;
  }
  funding: Funding = {
    count: 0,
    ticketPrice: 0,
    ticketsToFund: 0,
    ticketsSold: 0,
    fundedPercentage: 0
  };
}
