import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { head } from 'lodash';

import { SearchService, LocalStorageService } from '../shared';
import { Config } from '../app.config';

@Component({
  selector: 'app-show-page-component',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})

export class ShowPageComponent implements OnInit {
  public router: Router;
  public searchService: SearchService;
  public localStorageService: LocalStorageService;
  public getEventsDataSubcribe: Subscription;
  public getCurrentShowSubcribe: Subscription;

  public checkModel: boolean;
  public donates: any[];
  public donationPeriodList: any[];
  public currentShow: any;
  public donation: number;
  public donationPeriod: string;

  public eventsData: any[];

  public constructor(router: Router,
                     searchService: SearchService,
                     localStorageService: LocalStorageService) {
    this.router = router;
    this.searchService = searchService;
    this.localStorageService = localStorageService;
  }

  public ngOnInit(): void {
    this.checkModel = true;
    this.donation = 2;
    this.donationPeriod = 'month';
    this.donates = [2, 5, 7, 10, 15, 20, 30, 50];
    this.donationPeriodList = ['year', 'month', 'week', 'day'];
    const getCurrentShowFromLocalStorage = JSON.parse(this.localStorageService.getItem('currentShow'));

    this.getCurrentShow(getCurrentShowFromLocalStorage);
    this.getSimilarEvents(getCurrentShowFromLocalStorage);
  }

  public getCurrentShow(rawQuery: any): void {
    const query: string = Config.objToQuery(rawQuery);

    this.getCurrentShowSubcribe = this.searchService.getEventsList(query)
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.currentShow = head(res.data);
      });
  }

  public getSimilarEvents(rawQuery: any): void {
    const query: string = Config.objToQuery({
      exceptByName: rawQuery.findByName,
      exceptByCreator: rawQuery.findByCreator
    });

    this.getEventsDataSubcribe = this.searchService.getEventsList(query)
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.eventsData = res.data;
      });
  }

  public pushDonateNumber(donateNumberPush: number): void {
    this.donation = donateNumberPush;
  }

  public pushDonatePeriod(donatePeriodPush: string): void {
    this.donationPeriod = donatePeriodPush;
  }
}
