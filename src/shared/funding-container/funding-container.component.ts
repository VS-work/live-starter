import { Component, Input } from '@angular/core';

interface Funding {
  count: number;
  ticketPrice: number;
  ticketsToFund: number;
  ticketsSold: number;
  fundedPercentage: number;
}

@Component({
  selector: 'app-funding-container',
  templateUrl: 'funding-container.component.html',
  styleUrls: ['funding-container.component.scss']
})
export class FundingContainerComponent {
  @Input() set fundingParams(params: Funding) {
    this.funding = params;
    const funded = (params.ticketsSold / params.ticketsToFund) * 100;
    this.funding.fundedPercentage = isNaN(funded) ? 0 : funded;
  }
  funding: Funding;
}
