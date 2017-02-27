import { Component, OnInit } from '@angular/core';

import { GetEventsListService } from './events-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list-component',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})

export class EventsListComponent implements OnInit {
  public getEventsDada: GetEventsListService;
  public getEventsDataSubcribe: Subscription;
  public eventsData: any[];

  public constructor(getEventsDada: GetEventsListService) {
    this.getEventsDada = getEventsDada;
  }

  public ngOnInit(): void {

    this.getEventsDataSubcribe = this.getEventsDada.getEventsListData()
      .subscribe((res) => {
      if (res.error) {
        console.error(res.error);
      }

      this.eventsData = res.data;
      console.log('eventsData: ', this.eventsData);
    });
  }
}
