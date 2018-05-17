import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchResult, SearchService } from '../shared/search-service/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})

export class SearchResultComponent implements OnInit {
  searchresult: SearchResult = {
    users: [],
    events: []
  };

  constructor(private route: ActivatedRoute, private searchService: SearchService) {

  }

  ngOnInit() {
    this.route.queryParams
      .filter(res => !!res.query)
      .subscribe(params => {
        const searchResult$ = this.searchService.searchByQuery(params.query);

        searchResult$
          .subscribe(res => {
            this.searchresult = res;
          }, err => {
            console.error('something went wrong: ', err);
          });
      });
  }
}
