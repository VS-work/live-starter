import { Component, Input, OnInit } from '@angular/core';
import { LikeRequestObj, Statistics } from './statistics.interface';
import { StatisticsService } from './statistics.service';
import { User } from '../../edit-profile/user.interface';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { customToastOptions } from '../models/toasty-options.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['../../my-events/styles.scss', './statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Input() statistics: Statistics;
  @Input() id: string;
  @Input() isEvent = true;
  user: User;

  constructor(private statisticsService: StatisticsService, private toastyService: ToastyService) {

  }

  ngOnInit() {
    this.getcurrentUser();
  }

  getcurrentUser(): void | undefined {
    try {
      const userProfile = localStorage.getItem('profile');

      if (!userProfile) {
        this.user = null;

        return undefined;
      }

      this.user = JSON.parse(userProfile);
    } catch (err) {
      console.log('err: ', err);
    }
  }

  setLike(): void {
    if (!this.user) {
      const toastOptions: ToastOptions = {
        ...customToastOptions,
        ...{title: 'Error', msg: `Unregistered user can't like anything. Please sign up or sign in.`}
      };
      this.toastyService.error(toastOptions);

      return undefined;
    }

    const rqstObj: LikeRequestObj = {
      liker: this.user._id,
      likee: this.id
    };

    if (!this.isEvent) {
      this.statisticsService.setArtistLike(rqstObj)
        .subscribe(res => {
          this.statistics.likes = res.likesCount;
        }, err => {
          console.log('error', err);
        });
      return;
    }

    this.statisticsService.setShowLike(rqstObj)
      .subscribe(res => {
        this.statistics.likes = res.likesCount;
      }, err => {
        console.log('error', err);
      });
  }
}
