import { Component } from '@angular/core';

import { ShowInfo } from '../shared/show-info/info.interface';
import { ShowManagementService } from '../shared/services/show-management-service';

@Component({
  selector: 'app-events-administrating-by-me',
  templateUrl: './events-administrating-by-me.component.html',
  styleUrls: ['./events-administrating-by-me.component.scss']
})
export class EventsAdministratingByMeComponent {
  shows: ShowInfo[] = [];
  isCreateBtnActive = true;
  isEventAdministratedByCurrentUser = true;

  constructor(private showManagementService: ShowManagementService) {
    if (this.showManagementService.userProfile && this.showManagementService.userProfile._id) {
      const query = {findByCreator: showManagementService.userProfile._id};

      const showsSubscription = this.showManagementService.getEventsInfoListByQuery(query);
      showsSubscription
        .filter(data => !!data.length)
        .subscribe(res => {
          this.shows = res
        }, err => {
          console.log('error: ', err);
        })
    }
  }
}
