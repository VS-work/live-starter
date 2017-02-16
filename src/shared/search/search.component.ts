import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchService: SearchService;
  public searchServiceSubscribe: Subscription;
  public styles: any[];

  public constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

  ngOnInit(): void {
    this.searchServiceSubscribe = this.searchService.getMusicStyles()
      .subscribe((res: any): void => {
        const styles: any = res.data;
        this.styles = styles.genres;
      });
  }

  public search(): void {
    console.log('search womething with me. :) ');
  }
}
