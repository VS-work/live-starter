import { Component } from '@angular/core';
import { Show } from '../../event-launch/event-launch.model';

@Component({
  selector: 'app-my-event-page',
  templateUrl: './my-event-page.component.html',
})

export class MyEventPageComponent {
  showData: Show = new Show();

  constructor() {
    // mock
    this.showData.wowza = {
      id: 'bshjwppf'
    }
  }
}
