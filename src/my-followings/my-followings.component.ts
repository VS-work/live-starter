import { Component } from '@angular/core';

import { Config } from '../app.config';
import { User, UserManagementService } from '../shared/services/user-management-service';
import { ShowInfo } from '../shared/show-info/info.interface';

@Component({
  selector: 'app-my-followins',
  templateUrl: './my-followings.component.html',
  styleUrls: ['./my-followings.component.scss'],
})

export class MyFollowingsComponent {
  userProfile: User;
  followings: ShowInfo[] = [];

  constructor(private userManagementService: UserManagementService) {
    this.userProfile = this.userManagementService.getUserFromLocalStorage();

    if (!this.userProfile) {
      return;
    }

    const query: string = Config.objToQuery({follower: this.userProfile._id});

    const userFollowingsSubscription = this.userManagementService.getUserFollowings(query);

    userFollowingsSubscription.subscribe(res => {
      this.followings = res;
    }, err => {
      console.error('something went wrong: ', err);
    })
  }
}
