import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../signup/user.class';
import { SignUpService } from '../../signup/signup.service';
import { Statistics } from '../statistics/statistics.interface';
import { EventInfo } from './event-info.interface';
import { ShortUserInfo } from '../short-user-info/short-user-info.interface';

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
  artistStatisctics: Statistics = {};
  getUserSubcribe: Subscription;
  shortUserInfo: ShortUserInfo;

  constructor(private userServise: SignUpService) {

  }

  getArtist(artistId: string): void {
    this.getUserSubcribe = this.userServise.getUser({_id: artistId})
      .subscribe(res => {
        this.artistProfile = new User(res.data);
        this.artistStatisctics = {
          likes: this.artistProfile.statistics.likes.liked,
          followers: this.artistProfile.statistics.followers,
          viewers: this.artistProfile.statistics.viewers,
          shows: this.artistProfile.shows.owned
        };

        this.shortUserInfo = {
          avatar: this.artistProfile.avatar,
          username: this.artistProfile.username,
          showLocation: this.info.showLocation
        };
      });
  }

  ngOnDestroy() {
    this.getUserSubcribe.unsubscribe();
  }
}
