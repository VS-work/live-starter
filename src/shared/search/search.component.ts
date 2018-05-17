import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RouterLinks } from '../../enums/router-links.emum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchText = '';

  constructor(private router: Router) {

  }

  searchArtistData(): void {
    this.router.navigate([`/${RouterLinks.SearchResult}`], {queryParams: {query: this.searchText}});
  }
}
