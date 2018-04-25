import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SearchService, LocalStorageService } from '../shared';
import { User } from '../shared/services/user-service';
import { ShowInfo } from '../shared/show-info/info.interface';

import { MultipleGenres } from '../event-launch/multipleGenres.interface';
import { QueryToFindArtists } from '../shared/search-service/search.service';
import { LocationService } from '../shared/services';
import { Country } from '../shared/models';
import { Show } from '../shared/show-service/show.model';
import { UserService } from '../shared/services/user-service/user.service';
import { Config } from '../app.config';

const defaultQuery: QueryToFindArtists = {
  findByGenre: [],
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
  genres: MultipleGenres[] = [];
  locations: Country[] ;
  eventTypes: string[] = ['Popular', 'Newest', 'End Date', 'Most Funded', 'Most Backed'];
  artistsInfo: ShowInfo[] = [];
  aritstsAmount = 0;
  queryToFindArtists: QueryToFindArtists ;
  subsribeManager = new Subscription();

  constructor(private router: Router,
              private searchService: SearchService,
              private userService: UserService,
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

    const artistsAmountSubscribe = this.userService.getUsersAmount(query)
      .subscribe(res => {
        this.aritstsAmount = res;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subsribeManager.add(artistsAmountSubscribe);

    const genresListSubscribe = this.searchService.getGenres()
      .subscribe(res => {
        this.genres = ['Select all'].concat(res)
         .map((genre: string) => ({isChecked: false, value: genre}));
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subsribeManager.add(genresListSubscribe);

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

    if (!parsedQuery.findByGenre.length) {
      delete parsedQuery.findByGenre;
    }

    return parsedQuery;
  }


  pushGenreToList(genre: string): void {
    if (genre !== 'Select all') {
      const index = this.queryToFindArtists.findByGenre.indexOf(genre);
      if (index !== -1) {
        this.queryToFindArtists.findByGenre.splice(index, 1);
      }

      if (index === -1) {
        this.queryToFindArtists.findByGenre.push(genre);
      }
    }

    if (genre === 'Select all') {
      const isSelectAll = this.genres[0].isChecked;
      this.genres = this.genres.map(item => {
        return {
          ...item,
          isChecked: isSelectAll ? true : false
        }
      });

      this.queryToFindArtists.findByGenre = isSelectAll ?  this.genres.map(item => item.value)
        .filter(item => item !== 'Select all') : [];
    }
    this.getArtists();
  }

  resetFilters(): void {
    this.genres = this.genres.map(item => {
      return {
        ...item,
        isChecked: false
      }
    });
    this.queryToFindArtists = {...defaultQuery};
  }

  ngOnDestroy() {
    this.subsribeManager.unsubscribe();
  }
}
