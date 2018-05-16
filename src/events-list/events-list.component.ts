import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { SearchService, LocalStorageService } from '../shared';
import { ShowInfo } from '../shared/show-info/info.interface';
import { ShowManagementService } from '../shared/services/show-management-service';

@Component({
  selector: 'app-events-list-component',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})

export class EventsListComponent implements OnInit {
  private router: Router;
  public searchService: SearchService;
  public localStorageService: LocalStorageService;
  public getEventsDataSubcribe: Subscription;

  public isColumn = true;
  public eventTypes: string[] = ['Popular', 'Newest', 'Most Funded'];
  public eventsData: any[];
  public shows: ShowInfo[] = [];
  public datesAround: any[];
  public datepickerShow: Boolean;
  public queryToFindShow: any;
  public nonLiveEventsAmount: number;

  public dateShowPerformance: any;
  public displayLiveShows: any = {
    isChecked: false
  };

  public constructor(router: Router,
                     private showManagementService: ShowManagementService,
                     searchService: SearchService,
                     localStorageService: LocalStorageService) {
    this.router = router;
    this.searchService = searchService;
    this.localStorageService = localStorageService;
  }

  public ngOnInit(): void {
    this.datepickerShow = false;

    this.queryToFindShow = {
      dateShowPerformance: new Date()
    };

    this.findEventsByQuery(this.queryToFindShow);

    this.getEventsDataSubcribe = this.showManagementService.getEventsAmountData()
      .subscribe(res => {
        this.nonLiveEventsAmount = res;
      }, err => {
        console.error('something went wrong: ', err);
      });
  }

  public setTodayDate(): void {
    this.queryToFindShow.dateShowPerformance = new Date();
    this.findEventsByQuery(this.queryToFindShow);
  }

  setDay(direction: boolean): void {
    const newDateString = direction
      ? moment(this.queryToFindShow.dateShowPerformance).add(1, 'day')
      : moment(this.queryToFindShow.dateShowPerformance).add(-1, 'day');

    this.queryToFindShow.dateShowPerformance = new Date(newDateString.format('dddd, MMMM DD YYYY'));

    this.findEventsByQuery(this.queryToFindShow);
  }

  public findEventsByQuery(findByQuery: any): void {
    const dateString = moment(findByQuery.dateShowPerformance).format('dddd, MMMM DD YYYY');

    const rawQuery: any = {
      startDate: new Date(dateString).getTime(),
      endDate: new Date(dateString).setDate(new Date(dateString).getDate() + 1) - 1,
      findByLocation: findByQuery.findByLocation,
      findByGenre: findByQuery.findByGenre,
      findByType: findByQuery.findByType
    };

    if (!findByQuery.findByGenre || findByQuery.findByGenre === undefined || findByQuery.findByGenre === 'Select all') {
      delete rawQuery.findByGenre;
    }

    if (!findByQuery.findByLocation || findByQuery.findByLocation === undefined || findByQuery.findByLocation === 'Select all') {
      delete rawQuery.findByLocation;
    }

    if (!findByQuery.findByType || findByQuery.findByType === undefined || findByQuery.findByType === 'Select all') {
      delete rawQuery.findByType;
    }

    this.getEventsDataSubcribe = this.showManagementService.getEventsInfoListByQuery(rawQuery)
      .subscribe(res => {
        this.shows = res;
      }, err => {
        console.error('something went wrong: ', err);
      });
  }

  public pushTypeToList(showTypePush: string): void {
    this.queryToFindShow.findByType = showTypePush;
    this.findEventsByQuery(this.queryToFindShow);
  }

  changeDate(): void {
    this.findEventsByQuery(this.queryToFindShow);
  }
}
