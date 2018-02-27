import { Component } from '@angular/core';

import { SearchService } from '../shared';
import { User } from '../user-service/user.model';
import { Show } from '../event-launch/event-launch.model';
import { ShowInfo } from '../shared/show-info/info.interface';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./styles.scss', './my-events.component.scss'],
})

export class MyEventsComponent {
  shows: ShowInfo[] = [];
  userProfile: User;
  isCreateBtn = true;
  isMyEvents = true;

  constructor (private searchService: SearchService) {
    try {
      this.userProfile = new User(JSON.parse(localStorage.getItem('profile')));

      const query = {findByBuyers: this.userProfile._id};
      this.searchService.getEventsList(query).subscribe(res => {
        this.shows = this.sortShows(res)
          .map(show => ({isEvent: true, show: new Show(show)}));
      }, err => {
        console.log('error: ', err);
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
