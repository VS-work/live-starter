import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { User, UserManagementService } from '../shared/services/user-management-service';
import {
  Show,
  ShowManagementService,
  EventByQuery,
  LinkWithEmbedCode
} from '../shared/services/show-management-service';
import { ShowInfo } from '../shared/show-info/info.interface';
import { StatisticsItem } from '../shared/statistics/statistics.interface';
import {
  STATISTICS_FOLLOWERS,
  STATISTICS_LIKES,
  STATISTICS_SHOWS,
  STATISTICS_VIEWERS
} from '../shared/statistics/statistics-types.model';
import { ArtistType } from '../enums/user-types.enum';
import { ShortUserInfo } from '../shared/short-user-info/short-user-info.interface';
import { GetTipsQuery, TipsManagementService } from '../shared/services';

@Component({
  selector: 'app-public-user-profile-component',
  templateUrl: './public-user-profile.component.html',
  styleUrls: ['./public-user-profile.component.scss']
})

export class PublicUserProfileComponent implements OnInit {
  isUserArtist = false;
  user: User;
  joinDate: string;
  dateOfBirth: string;
  backedShows: ShowInfo[] = [];
  attendedShows: ShowInfo[] = [];
  comingShows: ShowInfo[] = [];
  userStatistics: StatisticsItem[] = [];
  tipsInfo: ShortUserInfo[] = [];
  query: EventByQuery;
  audios: LinkWithEmbedCode[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userManagementService: UserManagementService,
              private showManagementService: ShowManagementService,
              private tipsManagementService: TipsManagementService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (!params.id) {
          this.router.navigate(['/']);

          return;
        }

        const userSubscription = this.userManagementService.getUser({_id: params.id});

        userSubscription
          .filter(res => res instanceof User)
          .subscribe(user => {
            this.user = user;
            this.isUserArtist = user.type === ArtistType.type;
            this.setJoinandBirthDate();
            this.userStatistics = [
              {...STATISTICS_VIEWERS, ...{value: this.user.statistics.viewers}},
              {...STATISTICS_LIKES, ...{value: this.user.statistics.likes.liked}},
              {...STATISTICS_FOLLOWERS, ...{value: this.user.statistics.followers}},
              {...STATISTICS_SHOWS, ...{value: this.user.shows.owned}}
            ];
            this.getUsersAudio();

            if (this.isUserArtist) {
              this.query = {
                findByCreator: this.user._id,
                findByCompleted: false,
              };

              return;
            }

            this.query = {
              findByBuyers: this.user._id,
              findByCompleted: false,
              exceptByCreator: this.user._id
            };
          }, err => {
            console.error('something went wrong: ', err);
          });
      });
  }

  setJoinandBirthDate(): void {
    this.joinDate = this.user.joinDate
      ? moment(this.user.joinDate).format('dddd, MMMM DD YYYY') : undefined;

    this.dateOfBirth = this.user.dateOfBirth
      ? moment(this.user.dateOfBirth).format('dddd, MMMM DD YYYY') : undefined;
  }

  getBackedShows(): void {
    if (this.backedShows.length) {
      return;
    }

    const query: EventByQuery = {...this.query, ...{findByCompleted: this.isUserArtist ? true : false}};

    const backedShowsSubscription = this.showManagementService.getEventsListByQuery(query);
    backedShowsSubscription
      .filter(res => res.length && res[0] instanceof Show)
      .subscribe(res => {
        this.backedShows = res.map(show => this.getShowInfo(show));
      }, err => {
        console.error('something went wrong: ', err);
      });
  }

  getAttendedShowsForFan(): void {
    if (this.attendedShows.length) {
      return;
    }

    const query: EventByQuery = {...this.query, ...{findByCompleted: true}};

    const attendedShowsSubscription = this.showManagementService.getEventsListByQuery(query);
    attendedShowsSubscription
      .filter(res => res.length && res[0] instanceof Show)
      .subscribe(res => {
        this.attendedShows = res.map(show => this.getShowInfo(show));
      }, err => {
        console.error('something went wrong: ', err);
      });
  }

  getComingsShows(): void {
    if (this.comingShows.length) {
      return;
    }

    const query: EventByQuery = {...this.query, ...{findByCompleted: false}};

    const comingShowsSubscription = this.showManagementService.getEventsListByQuery(query);
    comingShowsSubscription
      .filter(res => res.length && res[0] instanceof Show)
      .subscribe(res => {
        this.comingShows = res.map(show => this.getShowInfo(show));
      }, err => {
        console.error('something went wrong: ', err);
      });
  }

  getTips(): void {
    if (this.tipsInfo.length) {
      return;
    }

    const query: GetTipsQuery = {
      findByAddressee: this.user._id
    };

    const tipsInfo$ = this.tipsManagementService.getTips(query);

    tipsInfo$.subscribe(tips => {
      this.tipsInfo = tips;
    });
  }

  getUsersAudio() {
    const audios$ = this.userManagementService.getAudios(this.user._id);

    audios$.subscribe(res => {
      this.audios = res;
    });
  }

  getShowInfo(show: Show): ShowInfo {
    return {
      isEvent: true,
      show,
      user: this.user
    }
  }

}
