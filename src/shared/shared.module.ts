import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ng2-bootstrap/rating';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search';
import { FeaturedArtistsComponent, FeaturedArtistsService } from './featured-artists';
import { PopularShowsComponent } from './popular-shows';
import { ArtistsYouMayLikeComponent } from './artists-you-may-like';
import { UpcomingShowsComponent } from './upcoming-shows';
import { HowItWasComponent } from './how-it-was';
import { WhatTheySayComponent } from './what-they-say';
import { PrefooterComponent } from './prefooter';
import { FooterComponent } from './footer';
import { ShowsTipComponent } from './show-tip';
import { ShowsBackedComponent } from './show-backed';
import { ShowsRecordedComponent } from './show-recorded';
import { CommentTipComponent } from './comment-tip';
import { StarRatingComponent } from './star-rating';

import { SearchService } from './search-service';
import { LocalStorageService } from './local-storage-service';

@NgModule({
  declarations: [
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
  ]
})

export class SharedModule {
}
