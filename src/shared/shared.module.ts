import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { GenresFilterComponent } from './genres-filter/genres-filter.component';
import { GenresFilterPipe } from './genres-filter/genres-filter.pipe';
import { SearchComponent, SearchService } from './search';
import { FeaturedArtistsComponent } from './featured-artists/featured-artists.component';
import { PopularShowsComponent } from './popular-shows/popular-shows.component';
import { ArtistsYouMayLikeComponent } from './artists-you-may-like/artists-you-may-like.component';
import { UpcomingShowsComponent } from './upcoming-shows/upcoming-shows.component';
import { HowItWasComponent } from './how-it-was/how-it-was.component';
import { WhatTheySayComponent } from './what-they-say/what-they-say.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { PrefooterComponent } from './prefooter/prefooter.component';
import { FooterComponent } from './footer/footer.component';
import { ShowsTipComponent } from './show-tip/show-tip.component';
import { ShowsBackedComponent } from './show-backed/show-backed.component';
import { ShowsRecordedComponent } from './show-recorded/show-recorded.component';
import { CommentTipComponent } from './comment-tip/comment-tip.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RatingModule } from 'ng2-bootstrap';
import { FormsModule } from '@angular/forms';

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
    HowItWorksComponent,
    BenefitsComponent,
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
  providers: [SearchService],
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
    HowItWorksComponent,
    BenefitsComponent,
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
