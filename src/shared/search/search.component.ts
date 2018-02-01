import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from '../search-service';
import { LocalStorageService } from '../local-storage-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public localStorageService: LocalStorageService;
  public searchService: SearchService;
  public searchServiceSubscribe: Subscription;
  private router: Router;
  public styles: any[];

  public constructor(searchService: SearchService,
                     router: Router,
                     localStorageService: LocalStorageService) {
    this.router = router;
    this.searchService = searchService;
    this.localStorageService = localStorageService;
  }

  ngOnInit(): void {
    const clearSearchData: any = this.localStorageService.getItem('homePageSearchData');

    this.searchServiceSubscribe = this.searchService.getMusicStyles()
      .subscribe(res => {
        this.styles = res;
      }, err => {
        console.error('something went wrong: ', err);
      });

    if (clearSearchData) {
      this.localStorageService.removeItem('homePageSearchData');
    }
  }

  public searchArtistData(searchData: any): void {
    const searchArtists: any = {findByName: searchData.name, findByGenre: searchData.genre};

    this.localStorageService.setItem('homePageSearchData', JSON.stringify(searchArtists));
    this.router.navigate(['/artists']);
  }
}
