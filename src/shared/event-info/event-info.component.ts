import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { User, UserManagementService } from '../services/user-management-service';
import { StatisticsItem } from '../statistics/statistics.interface';
import { EventInfo } from './event-info.interface';
import { ShortUserInfo } from '../short-user-info/short-user-info.interface';
import {
  STATISTICS_FOLLOWERS, STATISTICS_LIKES, STATISTICS_SHOWS,
  STATISTICS_VIEWERS
} from '../statistics/statistics-types.model';
import { FanType } from '../../enums/user-types.enum';
import { RouterLinks } from '../../enums';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnDestroy {
  @Input() set eventInfo(info: EventInfo) {
    if (!info) {
      return;
    }

    this.info = info;
    this.getArtist(info.artistId);
  }
  @Input() isFollowing = false;
  info: EventInfo;
  artistProfile: User;
  artistStatisctics: StatisticsItem[] = [];
  getUserSubcribe: Subscription;
  shortUserInfo: ShortUserInfo;

  constructor(private userServise: UserManagementService) {

  }

  getArtist(artistId: string): void {
    this.getUserSubcribe = this.userServise.getUser({_id: artistId})
      .subscribe(res => {
        this.artistProfile = new User(res);
        this.artistStatisctics = [
          {...STATISTICS_VIEWERS, ...{value: this.artistProfile.statistics.viewers}},
          {...STATISTICS_LIKES, ...{value: this.artistProfile.statistics.likes.liked}},
          {...STATISTICS_FOLLOWERS, ...{value: this.artistProfile.statistics.followers}},
          {...STATISTICS_SHOWS, ...{value: this.artistProfile.shows.owned}}
        ];

        this.shortUserInfo = {
          avatar: this.artistProfile.avatar,
          username: this.artistProfile.username,
          userProfileLink: {
            routerLink: this.artistProfile.type === FanType.type ? `/${RouterLinks.FanProfile}` : `/${RouterLinks.ArtistProfile}`,
            queryParams: {
              id: this.artistProfile._id
            }
          },
        };
      });
  }

  ngOnDestroy() {
    this.getUserSubcribe.unsubscribe();
  }
}
