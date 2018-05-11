import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { ScrollToModule } from 'ng2-scroll-to';

import { SearchComponent } from './search';
import { HowItWasComponent } from './how-it-was';
import { PrefooterComponent } from './prefooter';
import { ShowsTipComponent } from './show-tip';
import { ShowsBackedComponent } from './show-backed';
import { ShowsRecordedComponent } from './show-recorded';
import { CommentTipComponent } from './comment-tip';
import { StarRatingComponent } from './star-rating';
import { GenresFilterComponent } from './genres-filter/genres-filter.component';
import { GenresFilterPipe } from './genres-filter/genres-filter.pipe';

import { SearchService } from './search-service';
import { LocalStorageService } from './local-storage-service';
import { WindowRefService } from './win-ref-service';

@NgModule({
  declarations: [
    SearchComponent,
    HowItWasComponent,
    PrefooterComponent,
    ShowsTipComponent,
    ShowsBackedComponent,
    ShowsRecordedComponent,
    CommentTipComponent,
    StarRatingComponent,
    GenresFilterComponent,
    GenresFilterPipe
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ScrollToModule.forRoot(),
    RatingModule.forRoot()
  ],
  providers: [
    SearchService,
    LocalStorageService,
    WindowRefService
  ],
  exports: [
    SearchComponent,
    HowItWasComponent,
    PrefooterComponent,
    ShowsTipComponent,
    ShowsBackedComponent,
    ShowsRecordedComponent,
    CommentTipComponent,
    StarRatingComponent
  ]
})

export class SharedModule {
}
