import { Component, Input, OnInit } from '@angular/core';

import { ToastOptions, ToastyService } from 'ng2-toasty';

import { StatisticsService } from './statistics.service';
import { UserService } from '../../user-service/user.service';
import { User } from '../../user-service/user.model';
import { customToastOptions } from '../models/toasty-options.model';
import { LikeRequestObj, StatisticsItem } from './statistics.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['../../my-events/styles.scss', './statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Input() statistics: StatisticsItem[] = [];
  @Input() id: string;
  @Input() isEvent = true;
  @Input() isTitle = false;
  user: User;

  constructor(private statisticsService: StatisticsService,
              private toastyService: ToastyService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.user = this.userService.getUserFromLocalStorage();
  }

  setLike(item: StatisticsItem): void  {
    if (item.title !== 'Likes') {
      return;
    }

    if (!this.user) {
      const toastOptions: ToastOptions = {
        ...customToastOptions,
        ...{title: 'Error', msg: `Unregistered user can't like anything. Please sign up or sign in.`}
      };
      this.toastyService.error(toastOptions);

      return;
    }

    const rqstObj: LikeRequestObj = {
      liker: this.user._id,
      likee: this.id
    };

    if (!this.isEvent) {
      this.statisticsService.setArtistLike(rqstObj)
        .subscribe(res => {
          item.value = res.likesCount;
        }, err => {
          console.error('something went wrong: ', err);
        });

      return;
    }

    this.statisticsService.setShowLike(rqstObj)
      .subscribe(res => {
        item.value = res.likesCount;
      }, err => {
        console.error('something went wrong: ', err);
      });
  }
}
