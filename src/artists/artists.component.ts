import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShowInfo } from '../shared/show-info/info.interface';
import { Config } from '../app.config';
import { Country } from '../shared/models';
import { SearchService, LocalStorageService } from '../shared';
import { User } from '../shared/services/user-management-service';
import { LocationService } from '../shared/services';
import { Show } from '../shared/services/show-management-service';
import { UserManagementService } from '../shared/services/user-management-service';
import { QueryToFindArtists } from '../shared/search-service/search.service';

const defaultQuery: QueryToFindArtists = {
  findByName: '',
  findByLocation: '',
  findByType: ''
};

@Component({
  selector: 'app-artists-component',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})

export class ArtistsComponent implements OnInit, OnDestroy {
  locations: Country[] ;
  eventTypes: string[] = ['Popular', 'Newest', 'Most Funded'];
  artistsInfo: ShowInfo[] = [];
  aritstsAmount = 0;
  queryToFindArtists: QueryToFindArtists ;
  subsribeManager = new Subscription();

  constructor(private router: Router,
              private searchService: SearchService,
              private userManagementService: UserManagementService,
              private locationService: LocationService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    try {
      const homePageSearchData = this.localStorageService.getItem('homePageSearchData');
      this.queryToFindArtists = JSON.parse(homePageSearchData) || {...defaultQuery};
    } catch (err) {
      this.queryToFindArtists = {...defaultQuery};
      console.error('something went wrong: ', err);
    }

    const query: string = Config.objToQuery({type: 'artist'});

    const artistsAmountSubscribe = this.userManagementService.getUsersAmount(query)
      .subscribe(res => {
        this.aritstsAmount = res;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subsribeManager.add(artistsAmountSubscribe);

    const locationsListSubscribe = this.locationService.getCountries()
      .subscribe(res => {
        const selectAll = {
          name: 'Select all',
          sortname: 'Select all'
        };
        this.locations = [selectAll].concat(res);
      }, err => {
        this.locations = [];
        console.error('something went wrong: ', err);
      });

    this.subsribeManager.add(locationsListSubscribe);

    this.getArtists();
  }

  getArtists(): void {
    const query: QueryToFindArtists = this.parseQuery();
    const artistsListSubscribe = this.searchService.getArtistsByQuery(query)
      .subscribe((res: ShowInfo[]) => {
        this.artistsInfo = res.map((item: ShowInfo) => {
          return {
            isEvent: false,
            user: new User(item.user),
            show: item.show ? new Show(item.show) : null
          };
        });
      }, err => {
        this.artistsInfo = [];
        console.error('something went wrong: ', err);
      });

    this.subsribeManager.add(artistsListSubscribe);
  }

  parseQuery(): QueryToFindArtists {
    const parsedQuery = {
      ...this.queryToFindArtists
    };

    if (parsedQuery.findByLocation === '' || parsedQuery.findByLocation === 'Select all') {
      delete parsedQuery.findByLocation;
    }

    if (parsedQuery.findByType === '' || parsedQuery.findByType === 'Select all') {
      delete parsedQuery.findByType;
    }

    if (!parsedQuery.findByName.trim().length) {
      delete parsedQuery.findByName;
    }

    return parsedQuery;
  }

  resetFilters(): void {
    this.queryToFindArtists = {...defaultQuery};
  }

  ngOnDestroy() {
    this.subsribeManager.unsubscribe();
  }
}
