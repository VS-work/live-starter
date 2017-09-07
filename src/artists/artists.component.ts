import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SearchService, LocalStorageService } from '../shared';
import { Config } from '../app.config';

@Component({
  selector: 'app-artists-component',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})

export class ArtistsComponent implements OnInit {
  private router: Router;

  public genres: any[];
  public locations: any[];
  public eventTypes: any[];

  public searchService: SearchService;
  public localStorageService: LocalStorageService;
  public getArtistsListSubscribe: Subscription;
  public getArtistsAmountSubscribe: Subscription;
  public getGenresListSubscribe: Subscription;
  public getLocationsListSubscribe: Subscription;

  public artistByName: string;
  public aritstsAmount: number;
  public queryToFindArtists: any = {};
  public artists: any[];

  public constructor(router: Router,
                     searchService: SearchService,
                     localStorageService: LocalStorageService) {
    this.router = router;
    this.searchService = searchService;
    this.localStorageService = localStorageService;
  }

  ngOnInit(): void {
    this.eventTypes = ['Popular', 'Newest', 'End Date', 'Most Funded', 'Most Backed'];
    const getDataFromLocalStorage: any = JSON.parse(this.localStorageService.getItem('homePageSearchData'));

    this.getArtistsAmountSubscribe = this.searchService.getArtistsList('')
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.aritstsAmount = res.data.amount;
      });

    this.getGenresListSubscribe = this.searchService.getMusicStyles()
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.genres = res.data.genres;
      });

    this.getLocationsListSubscribe = this.searchService.getLocations()
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.locations = res.data;
      });

    if (!getDataFromLocalStorage) {
      this.getArtistsListSubscribe = this.searchService.getArtistsList('')
        .subscribe((res: any): void => {
          if (res.error) {
            console.error(res.error);
            return;
          }
          this.artists = res.data.artists;
        });
      return;
    }

    const query: any = Config.objToQuery(getDataFromLocalStorage);
    this.queryToFindArtists.findByGenre = getDataFromLocalStorage.findByGenre || '';
    this.queryToFindArtists.findByName = getDataFromLocalStorage.findByName || '';
    this.artistByName = getDataFromLocalStorage.findByName || '';

    this.getArtistsListSubscribe = this.searchService.getArtistsList(query)
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.artists = res.data.artists;
      });
  }

  public goTo(): void {
    this.router.navigate(['artist-profile']);
  }

  public findArtistsByQuery(findByQuery: any): void {
    const rawQuery: any = {
      findByName: this.artistByName,
      findByLocation: findByQuery.findByLocation,
      findByGenre: findByQuery.findByGenre,
      findByType: findByQuery.findByType
    };

    if (!findByQuery.findByName || this.artistByName === undefined || this.artistByName === '') {
      delete rawQuery.findByName;
    }

    if (!findByQuery.findByGenre || findByQuery.findByGenre === undefined || findByQuery.findByGenre === 'Select all') {
      delete rawQuery.findByGenre;
    }

    if (!findByQuery.findByLocation || findByQuery.findByLocation === undefined || findByQuery.findByLocation === 'Select all') {
      delete rawQuery.findByLocation;
    }

    if (!findByQuery.findByType || findByQuery.findByType === undefined || findByQuery.findByType === 'Select all') {
      delete rawQuery.findByType;
    }

    const query: any = Config.objToQuery(rawQuery);

    this.getArtistsListSubscribe = this.searchService.getArtistsList(query)
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.artists = res.data.artists;
      });

    this.localStorageService.removeItem('homePageSearchData');
  }

  public pushNameToList(namePush: string): void {
    this.queryToFindArtists.findByName = namePush;
    this.findArtistsByQuery(this.queryToFindArtists);
  }

  public pushGenreToList(genrePush: string): void {
    this.queryToFindArtists.findByGenre = genrePush;
    this.findArtistsByQuery(this.queryToFindArtists);
  }

  public pushLocationToList(locationPush: string): void {
    this.queryToFindArtists.findByLocation = locationPush;
    this.findArtistsByQuery(this.queryToFindArtists);
  }

  public pushTypeToList(showTypePush: string): void {
    this.queryToFindArtists.findByType = showTypePush;
    this.findArtistsByQuery(this.queryToFindArtists);
  }

  public resetFilters(): void {
    this.queryToFindArtists = {};
    this.findArtistsByQuery(this.queryToFindArtists);
  }
}
