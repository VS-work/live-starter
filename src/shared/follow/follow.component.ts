import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ToastOptions, ToastyService } from 'ng2-toasty';

import { FollowService } from './follow.service';
import { User } from '../../signup/user.class';
import { customToastOptions } from '../models/toasty-options.model';
import { FollowResponse, FollowRqstObj } from './follow.interface';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnDestroy {
  @Input() set followedUser(userId: string) {
    if (!userId) {
      return;
    }
    this.getCurrentUser(userId);
  };
  followingSubscribe: Subscription;
  currentUser: User;
  rqstObj: FollowRqstObj;
  btnText = 'Follow';

  constructor(private followService: FollowService, private toastyService: ToastyService) {

  }

  getCurrentUser(followingId: string): void | undefined {
    try {
      const userProfile = localStorage.getItem('profile');

      if (!userProfile) {
        this.currentUser = null;

        return undefined;
      }

      this.currentUser = new User(JSON.parse(userProfile));
      this.rqstObj = {
        follower: this.currentUser._id,
        following: followingId,
      };

      this.followService.checkFollowed(this.rqstObj)
        .subscribe((res: FollowResponse) => {
          this.setBtnText(res.isFollowed);
        });
    } catch (err) {
      this.currentUser = null;
      console.error('something went wrong: ', err);
    }
  }

  follow(): void | undefined {
    if (!this.currentUser || !this.rqstObj.follower) {
      const toastOptions: ToastOptions = {
        ...customToastOptions,
        ...{title: 'Error', msg: `Unregistered user can't follow anything. Please sign up or sign in.`}
      };
      this.toastyService.error(toastOptions);

      return undefined;
    }

    if (this.rqstObj.follower === this.rqstObj.following) {
      const toastOptions: ToastOptions = {
        ...customToastOptions,
        ...{title: 'Error', msg: `You can't follow on yourself`}
      };
      this.toastyService.error(toastOptions);

      return undefined;
    }

    this.followingSubscribe = this.followService.followUser(this.rqstObj)
      .subscribe((res: FollowResponse) => {
        this.setBtnText(res.isFollowed);
        const toastOptions: ToastOptions = {
          ...customToastOptions,
          ...{title: 'Success', msg: res.message}
        };
        this.toastyService.success(toastOptions);
      }, err => {
        console.error('something went wrong', err);
      });
  }

  setBtnText(isFollowed: boolean): void {
    this.btnText = isFollowed ? 'Unfollow' : 'Follow';
  }

  ngOnDestroy() {
    if (this.followingSubscribe) {
      this.followingSubscribe.unsubscribe();
    }
  }
}
