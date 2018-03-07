import { Component } from '@angular/core';

@Component({
  selector: 'app-tips-container',
  templateUrl: './tips-container.component.html',
  styleUrls: ['./tips-container.component.scss']
})
export class TipsContainerComponent {
  donation = 2;
  donates: number[] = [2, 5, 7, 10, 15, 20, 30, 50];
  donationPeriod = 'Month';
  donationPeriodList: string[] = ['Year', 'Month', 'Week', 'Day', 'Once'];

}
