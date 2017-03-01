import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import * as moment from 'moment';

import { LocalStorageService } from '../auth/localStorage.service';
import { EventService } from './event.service';

import { SearchService } from '../shared/search';

interface ILaunchEvent {
  showName: string;
  tickets: number;
  ticketPrice: number;
  ticketsToFund: number;
  fundedPercentage: number;
  ticketsSold: number;
  creator: string;
  dateCreated: any;
  showLocation: string;
  datePerformance: any;
  artist: string;
  genre: any;
  description: string;
  audio: string;
  video: string;
  info: string;
  live: boolean;
  appreciations: any;
}

@Component({
  selector: 'app-launch-component',
  templateUrl: './event-launch.component.html',
  styleUrls: ['./event-launch.component.css']
})

export class LaunchComponent implements OnInit {
  public userProfile: any;
  public funded = 0;
  public genres: any[];
  public locations: any[];
  public selectedGenres = [];
  public secondStepActive = false;
  public dateByPicker: Date;

  public eventService: EventService;
  public eventServiceSubscribe: Subscription;

  public launchEvent: ILaunchEvent;
  public searchService: SearchService;
  public userProfileService: LocalStorageService;
  public searchServiceSubscribe: Subscription;

  private router: Router;

  public constructor(router: Router,
                     searchService: SearchService,
                     userProfileService: LocalStorageService,
                     eventService: EventService) {
    this.router = router;
    this.searchService = searchService;
    this.userProfileService = userProfileService;
    this.eventService = eventService;
  }

  public ngOnInit(): void {
    const userProfile: any = this.userProfileService.getItem('profile');

    if (userProfile) {
      this.userProfile = JSON.parse(userProfile);
    }

    this.userProfileService.getItemEvent().subscribe((userData) => {
      this.userProfile = JSON.parse(userData.value);
    });

    this.launchEvent = {
      showName: '',
      tickets: 0,
      ticketPrice: 0,
      ticketsToFund: 0,
      fundedPercentage: 0,
      ticketsSold: 0,
      creator: '',
      showLocation: '',
      dateCreated: moment(new Date()).format('dddd, MMMM DD YYYY'),
      datePerformance: moment(new Date()).format('dddd, MMMM DD YYYY'),
      artist: '',
      genre: [],
      description: '',
      audio: '',
      video: '',
      info: '',
      live: false,
      appreciations: {}
    };

    this.searchServiceSubscribe = this.searchService.getMusicStyles()
      .subscribe((res: any): void => {
        const styles: any = res.data;
        this.genres = styles.genres;
      });

    this.searchServiceSubscribe = this.searchService.getLocations()
      .subscribe((res: any): void => {
        this.locations = res.data;
      });
  }

  public pushGenreToList(genre: string): void {
    const index = this.selectedGenres.indexOf(genre);

    if (index !== -1) {
      this.selectedGenres.splice(index, 1);
      return;
    }

    this.selectedGenres.push(genre);
  }

  public setLocationToShow(location: string): void {
    this.launchEvent.showLocation = location;
  }

  public goToNextStep(): void {
    this.launchEvent.creator = this.userProfile.email;
    this.launchEvent.genre = this.selectedGenres;
    this.secondStepActive = true;
  };

  public publish(): void {
    this.launchEvent.datePerformance = moment(this.dateByPicker).format('dddd, MMMM DD YYYY');
    this.eventServiceSubscribe = this.eventService.saveNewEvent(this.launchEvent)
      .subscribe((res): void => {

        if (res.err) {
          console.error(res.err);
          return;
        }

        console.log('RESPOND: ', res);
      });

    this.router.navigate(['events']);
  }
}
