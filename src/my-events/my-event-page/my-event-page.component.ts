import { Component } from '@angular/core';
import { LaunchEvent } from '../../event-launch/event-launch.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-my-event-page',
  templateUrl: './my-event-page.component.html',
})

export class MyEventPageComponent {
  showData: LaunchEvent = { // mock, need rework
    name: 'Bluez Party',
    creator: '',
    description: '',
    artist: '',
    genres: [],
    posters: [],
    audios: [],
    videos: [],
    appreciations: [],
    info: '',
    live: false,
    completed: false,
    location: {
      country: ''
    },
    dateCreated: '',
    datePerformance: '',
    timePerfomance: {
      start: '',
      end: ''
    },
    tickets: {
      count: 0,
      ticketPrice: 0,
      ticketsToFund: 0,
      ticketsSold: 0,
      fundedPercentage: 0,
    },
    statistics: {
      likes: [],
      viewers: [],
      followers: []
    },
    wowza: {
      id: 'bshjwppf'
    }
  };
}
