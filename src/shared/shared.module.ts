import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ng2-bootstrap/rating';
import { FormsModule } from '@angular/forms';

import { GenresFilterComponent } from './genres-filter/genres-filter.component';
import { GenresFilterPipe } from './genres-filter/genres-filter.pipe';
import { SearchComponent, SearchService } from './search';
import { FeaturedArtistsComponent, FeaturedArtistsService } from './featured-artists';
import { PopularShowsComponent } from './popular-shows/popular-shows.component';
import { ArtistsYouMayLikeComponent } from './artists-you-may-like/artists-you-may-like.component';
import { UpcomingShowsComponent } from './upcoming-shows/upcoming-shows.component';
import { HowItWasComponent } from './how-it-was/how-it-was.component';
import { WhatTheySayComponent } from './what-they-say/what-they-say.component';
import { PrefooterComponent } from './prefooter/prefooter.component';
import { FooterComponent } from './footer/footer.component';
import { ShowsTipComponent } from './show-tip/show-tip.component';
import { ShowsBackedComponent } from './show-backed/show-backed.component';
import { ShowsRecordedComponent } from './show-recorded/show-recorded.component';
import { CommentTipComponent } from './comment-tip/comment-tip.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { LocalStorageService } from './local-storage-service/localStorage.service';


@NgModule({
  declarations: [
    GenresFilterComponent,
    GenresFilterPipe,
    SearchComponent,
    FeaturedArtistsComponent,
    PopularShowsComponent,
    ArtistsYouMayLikeComponent,
    UpcomingShowsComponent,
    HowItWasComponent,
    WhatTheySayComponent,
    PrefooterComponent,
    FooterComponent,
    ShowsTipComponent,
    ShowsBackedComponent,
    ShowsRecordedComponent,
    CommentTipComponent,
    StarRatingComponent
  ],
  imports: [
    HttpModule,
    RouterModule,
    CommonModule,
    FormsModule,
    RatingModule.forRoot()
  ],
  providers: [
    SearchService,
    LocalStorageService,
    FeaturedArtistsService
  ],
  exports: [
    GenresFilterComponent,
    SearchComponent,
    GenresFilterPipe,
    FeaturedArtistsComponent,
    PopularShowsComponent,
    ArtistsYouMayLikeComponent,
    UpcomingShowsComponent,
    HowItWasComponent,
    WhatTheySayComponent,
    PrefooterComponent,
    FooterComponent,
    ShowsTipComponent,
    ShowsBackedComponent,
    ShowsRecordedComponent,
    CommentTipComponent,
    StarRatingComponent
  ]
})

export class SharedModule {

}
