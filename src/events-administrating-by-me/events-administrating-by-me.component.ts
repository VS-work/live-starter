import { Component } from '@angular/core';

import { ShowInfo } from '../shared/show-info/info.interface';
import { Show } from '../shared/show-service/show.model';
import { ShowService } from '../shared/show-service/show.service';

@Component({
  selector: 'app-events-administrating-by-me',
  templateUrl: './events-administrating-by-me.component.html',
  styleUrls: ['./events-administrating-by-me.component.scss']
})
export class EventsAdministratingByMeComponent {
  shows: ShowInfo[] = [];
  isCreateBtnActive = true;
  isEventAdministratedByCurrentUser = true;

  constructor(private showService: ShowService) {
    if (this.showService.userProfile && this.showService.userProfile._id) {
      const query = {findByCreator: showService.userProfile._id};

      this.showService.getEventsListByQuery(query).subscribe(res => {
        this.shows = this.showService.sortShows(res)
          .map(show => ({isEvent: true, show: new Show(show)}));
      }, err => {
        console.log('error: ', err);
      })
    }
  }
}
