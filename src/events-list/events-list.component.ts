import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { SearchService } from '../shared';
import { GetEventsListService } from './events-list.service';
import { Config } from '../app.config';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list-component',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})

export class EventsListComponent implements OnInit {
  public searchService: SearchService;
  public searchServiceSubscribe: Subscription;
  public getEventsData: GetEventsListService;
  public getEventsDataSubcribe: Subscription;

  public genres: any[];
  public locations: any[];
  public eventsData: any[];
  public datesAround: any[];
  public datepickerShow: Boolean;
  public queryToFindShow: any;
  public nonLiveEventsAmount: number;

  public dateShowPerformance: any;
  public displayLiveShows: any = {
    isChecked: false
  };

  public constructor(getEventsData: GetEventsListService,
                     searchService: SearchService) {
    this.getEventsData = getEventsData;
    this.searchService = searchService;
  }

  public ngOnInit(): void {
    this.datepickerShow = false;

    this.queryToFindShow = {
      dateShowPerformance: new Date(),
      locationShowPerformance: '',
      genreShowPerformance: [],
      typeShowPerformance: ''
    };

    this.findEventsByQuery(this.queryToFindShow);

    this.searchServiceSubscribe = this.searchService.getMusicStyles()
      .subscribe((res: any): void => {
        const styles: any = res.data;
        this.genres = styles.genres;
      });

    this.searchServiceSubscribe = this.searchService.getLocations()
      .subscribe((res: any): void => {
        this.locations = res.data;
      });

    this.getEventsDataSubcribe = this.getEventsData.getNonLiveEventsAmountData()
      .subscribe((res) => {
        if (res.error) {
          return console.error(res.error);
        }
        this.nonLiveEventsAmount = res.data;
      });
  }

  public datePickerDropdown(): void {
    this.datepickerShow = !this.datepickerShow;
  }

  public setTodayDate(): void {
    this.queryToFindShow.dateShowPerformance = new Date();
    this.findEventsByQuery(this.queryToFindShow);
  }

  public setDay(direction: boolean): void {
    this.queryToFindShow.dateShowPerformance =
      direction
        ? moment(this.queryToFindShow.dateShowPerformance).add(1, 'day')
        : moment(this.queryToFindShow.dateShowPerformance).add(-1, 'day');
    this.findEventsByQuery(this.queryToFindShow);
  }

  public findEventsByQuery(findByQuery: any): void {
    const rawQuery = {
      findByDate: moment(findByQuery.dateShowPerformance).format('dddd, MMMM DD YYYY'),
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

    const query = Config.objToQuery(rawQuery);

    this.getEventsDataSubcribe = this.getEventsData.getEventsList(query)
      .subscribe((res) => {
        if (res.error) {
          console.error(res.error);
        }
        this.eventsData = res.data;
      });
  }

  public displayLiveShowsFunc(): void {
    console.log(this.displayLiveShows);
  }

  public pushGenreToList(genrePush: string): void {
    this.queryToFindShow.findByGenre = genrePush;
    this.findEventsByQuery(this.queryToFindShow);
  }

  public pushLocationToList(locationPush: string): void {
    this.queryToFindShow.findByLocation = locationPush;
    this.findEventsByQuery(this.queryToFindShow);
  }

  public pushTypeToList(showTypePush: string): void {
    this.queryToFindShow.findByType = showTypePush;
    this.findEventsByQuery(this.queryToFindShow);
  }
}
