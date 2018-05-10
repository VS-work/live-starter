import { Component } from '@angular/core';

import { SearchService } from '../shared';
import { User } from '../shared/services/user-management-service';
import { Show } from '../shared/services/show-management-service';
import { ShowInfo } from '../shared/show-info/info.interface';
import { ShowManagementService } from '../shared/services/show-management-service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./styles.scss', './my-events.component.scss'],
})

export class MyEventsComponent {
  shows: ShowInfo[] = [];
  userProfile: User;
  isCreateBtnActive = true;
  isMyEvents = true;

  constructor (private searchService: SearchService, private showManagementService: ShowManagementService) {
    try {
      this.userProfile = new User(JSON.parse(localStorage.getItem('profile')));

      const query = {findByBuyers: this.userProfile._id};
      this.showManagementService.getEventsInfoListByQuery(query).subscribe(res => {
        this.shows = res;
      }, err => {
        console.error('something went wrong: ', err);
      })
    } catch (err) {
      this.userProfile = null;
      console.error('something went wrong: ', err);
    }
  }

  sortShows(shows: Show[] ): Show[]  {
    return shows.sort((a: Show, b: Show) => {
      if (a.live || b.live) {
        return a.live ? -1 : 1;
      }

      if ((!a.live && !a.completed) || (!b.live && !b.completed) ) {
        return !a.live && !a.completed ? -1 : 1
      }

      return 0;
    });
  }
}
