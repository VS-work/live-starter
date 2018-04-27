import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { Config } from '../../app.config';
import { UserManagementService, User } from '../services/user-management-service';
import { Show } from '../services/show-management-service/show.model';
import { PurchaseParamsModel } from '../purchase-container/purchase-container.model';
import { RouterLinks } from '../../enums';
import { StatisticsItem } from '../statistics/statistics.interface';
import { ShowInfo } from './info.interface';
import { ShowInfoDate } from './showInfoDate.interface';
import {
  STATISTICS_FOLLOWERS,
  STATISTICS_LIKES,
  STATISTICS_SHOWS,
  STATISTICS_VIEWERS
} from '../statistics/statistics-types.model';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['../../my-events/styles.scss', './show-info.component.scss']
})

export class ShowInfoComponent {
  @Input() set info(data: ShowInfo) {
    if (!data) {
      return;
    }

    this.isEvent = data.isEvent;
    this.show = data.show;

    if (this.show) {
      this.parseDate(this.show.timePerformance.start);
      this.purchaseParams = new PurchaseParamsModel(this.show._id, this.currentUser ? this.currentUser._id : null);
    }
    if (!this.isEvent) {
      this.user = data.user;
      this.userProfileLink = this.user.type === 'fan' ? `/${RouterLinks.FanProfile}` : `/${RouterLinks.ArtistProfile}`;
      this.statistics = [
        {...STATISTICS_VIEWERS, ...{value: this.user.statistics.viewers}},
        {...STATISTICS_LIKES, ...{value: this.user.statistics.likes.liked}},
        {...STATISTICS_FOLLOWERS, ...{value: this.user.statistics.followers}},
        {...STATISTICS_SHOWS, ...{value: this.user.shows.owned}}
      ];
      return;
    }
    const userSubscription = this.userManagementService.getUser({_id: this.show.creator});
    userSubscription.subscribe(user => {
      this.user = user;
      this.userProfileLink = this.user.type === 'fan' ? `/${RouterLinks.FanProfile}` : `/${RouterLinks.ArtistProfile}`;
    });
    this.statistics = [
      {...STATISTICS_LIKES, ...{value: this.show.statistics.likes}},
      {...STATISTICS_FOLLOWERS, ...{value: this.show.statistics.followers}}
    ];
  };
  @Input() isSmall = false;
  @Input() isMyEvents = false;
  @Input() isEventAdministratedByCurrentUser = false;

  date: ShowInfoDate;
  show: Show;
  user: User;
  currentUser: User;
  statistics: StatisticsItem[] = [];
  isEvent: boolean;
  purchaseParams: PurchaseParamsModel;
  manageLiveStreamLink = `/${RouterLinks.ManageLiveStream}`;
  userProfileLink: string;
  showPageLink = `/${RouterLinks.ShowPage}`;

  constructor(private router: Router,
              private userManagementService: UserManagementService) {
    this.currentUser = this.userManagementService.getUserFromLocalStorage();
  }

  parseDate(date: string): void {
    const startDate = new Date(date);
    this.date = {
      dayNum: moment(startDate).format('Do').replace('th', ''),
      month: moment(startDate).format('MMMM'),
      time: moment(startDate).format('h:mm a').replace(' ', '')
    };
  }

  sliceDescription(maxLength = 100): string {
    if (!this.isEvent) {
      return this.user.biography.slice(0, maxLength);
    }

    return this.show.description.slice(0, maxLength);
  }

  getImgUrl(): string {
    if (!this.isEvent) {
      return this.user.avatar;
    }

    return `${Config.api}/uploads/posters/${this.show.posters[0]}`;
  }

  setShowIsBought(evt: boolean, show: Show): void {
    show.isBought = evt;
  }
}
