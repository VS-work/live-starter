import { Component } from '@angular/core';

@Component({
  selector: 'app-my-event-page',
  templateUrl: './my-event-page.component.html',
})

export class MyEventPageComponent {
  showData: any = {
    showName: 'Bluez Party',
    wowza: {
      id: 'mmvpmlkv',
    }
  };
}
