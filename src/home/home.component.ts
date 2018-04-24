import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { WindowRefService } from '../shared';
import { ShowManagementService } from '../shared/services/show-management-service';
import { UserManagementService } from '../shared/services/user-management-service';
import { ConfigFewShows } from '../shared/few-shows-container/few-shows-container.component';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  shows: ConfigFewShows[] = [];

  constructor(private router: Router,
              private winRef: WindowRefService,
              private showManagementService: ShowManagementService,
              private userManagementService: UserManagementService) {
    const queryFeaturedArtists = {withNextShow: true, limit: 3};

    const featuredArtists$ = this.userManagementService.getUsersWithNextShow(queryFeaturedArtists);

    const queryPopularShows = {
      minDate: new Date(),
      limit: 3
    };

    const popularShows$ = this.showManagementService.getEventsInfoListByQuery(queryPopularShows);

    const queryArtistsYouMayLike = {withNextShow: true, limit: 3};

    const artistsYouMayLike$ = this.userManagementService.getUsersWithNextShow(queryArtistsYouMayLike);

    const queryUpcomingShows = {
      minDate: new Date(),
      limit: 3
    };

    const upcomingShows$ = this.showManagementService.getEventsInfoListByQuery(queryUpcomingShows);

    const combined$ = combineLatest(featuredArtists$, popularShows$, artistsYouMayLike$, upcomingShows$);

    combined$.subscribe(([featuredArtists, popularShows, artistsYouMayLike, upcomingShows]) => {
      this.shows = [
        new ConfigFewShows({
          title: 'Featured Artists',
          items: featuredArtists,
          path: '/artists'
        }),
        new ConfigFewShows({
          title: 'Popular Shows',
          items: popularShows,
          path: '/events'
        }),
        new ConfigFewShows({
          title: 'Artists You May Like',
          items: artistsYouMayLike,
          path: '/artists'
        }),
        new ConfigFewShows({
          title: 'Upcoming Shows',
          items: upcomingShows,
          path: '/events'
        })
      ];
    })

  }

  ngOnInit() {
    this.router.events
      .subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }

        this.winRef.nativeWindow.scrollTo(0, 0);
      });
  }
}
