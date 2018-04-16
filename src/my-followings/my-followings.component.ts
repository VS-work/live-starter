import { Component } from '@angular/core';

import { SearchService } from '../shared';
import { User } from '../user-service/user.model';
import { Config } from '../app.config';
import { ShowInfo } from '../shared/show-info/info.interface';
import { Show } from '../shared/show-service/show.model';

@Component({
  selector: 'app-my-followins',
  templateUrl: './my-followings.component.html',
  styleUrls: ['./my-followings.component.scss'],
})

export class MyFollowingsComponent {
  userProfile: User;
  followings: ShowInfo[] = [];

  constructor (private searchService: SearchService) {
    try {
      this.userProfile = new User(JSON.parse(localStorage.getItem('profile')));
      const query: string = Config.objToQuery({follower: this.userProfile._id});
      this.searchService.getUserFollowings(query).subscribe(res => {
        this.followings = res.map((following: ShowInfo) => {
          return {
            user: new User(following.user),
            show: new Show(following.show),
            isEvent: false
          };
        });
      }, err => {
        console.error('something went wrong: ', err);
      })
    } catch (err) {
      this.userProfile = null;
      console.error('something went wrong: ', err);
    }
  }
}
