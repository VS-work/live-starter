import { Component, Input, OnInit } from '@angular/core';

import * as moment from 'moment';
import { LaunchEvent } from '../../event-launch/event-launch.interface';
import { Statistics } from '../statistics/statistics.interface';
import { ShowInfoDate } from './showInfoDate.interface';
import { Config } from '../../app.config';

@Component({
  selector: 'app-show-info',
  templateUrl: 'show-info.component.html',
  styleUrls: ['../../my-events/styles.scss', 'show-info.component.scss']
})

export class ShowInfoComponent implements OnInit {
  @Input() show: LaunchEvent;
  @Input() isSmall = false;

  date: ShowInfoDate;

  ngOnInit() {
    this.parseDate(this.show.timePerfomance.start);
  }

  parseDate(date: string): void {
    const startDate = new Date(date);
    this.date = {
      dayNum: moment(startDate).format('Do').replace('th', ''),
      month: moment(startDate).format('MMMM'),
      time: moment(startDate).format('h:mm a').replace(' ', '')
    };
  }

  sliceDescription(maxLength = 100): string {
    return this.show.description.slice(0, maxLength);
  }

  getImgUrl(fileName: string): string {
    return `${Config.api}/uploads/posters/${fileName}`;
  }
}
