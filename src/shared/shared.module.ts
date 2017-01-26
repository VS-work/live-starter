import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { GenresFilterComponent } from './genres-filter/genres-filter.component';
import { GenresFilterPipe } from './genres-filter/genres-filter.pipe';
import { SearchComponent, SearchService } from './search';
import { FeaturedArtistsComponent } from './featured-artists/featured-artists.component';
import { PopularShowsComponent } from './popular-shows/popular-shows.component';

@NgModule({
  declarations: [
    GenresFilterComponent,
    GenresFilterPipe,
    SearchComponent,
    FeaturedArtistsComponent,
    PopularShowsComponent
  ],
  imports: [
    HttpModule,
    RouterModule,
    CommonModule
  ],
  providers: [SearchService],
  exports: [
    GenresFilterComponent,
    SearchComponent,
    GenresFilterPipe,
    FeaturedArtistsComponent,
    PopularShowsComponent
  ]
})

export class SharedModule {

}
