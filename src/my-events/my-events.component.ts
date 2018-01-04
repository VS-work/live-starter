import { Component } from '@angular/core';
import { SearchService } from '../shared';
import { Config } from '../app.config';
import { LaunchEvent } from '../event-launch/event-launch.interface';
import { User } from '../signup/user.class';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./styles.scss', './my-events.component.scss'],
})

export class MyEventsComponent {
  shows: LaunchEvent[] = [];
  userProfile: User;

  constructor (private searchService: SearchService) {
    try {
      this.userProfile = new User(JSON.parse(localStorage.getItem('profile')));
      const query: string = Config.objToQuery({findByBuyers: this.userProfile._id});
      this.searchService.getMyEvents(query).subscribe(res => {
        this.shows = this.sortShows(res);
      }, err => {
        console.log('error: ', err);
      })
    } catch (err) {
      this.userProfile = null;
      console.error('something went wrong: ', err);
    }
  }

  sortShows(shows: LaunchEvent[] ): LaunchEvent[]  {
    return shows.sort((a: LaunchEvent, b: LaunchEvent) => {
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
