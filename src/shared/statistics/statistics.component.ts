import { Component, Input } from '@angular/core';
import { LikeRequestObj, Statistics } from './statistics.interface';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['../../my-events/styles.scss', 'statistics.component.scss']
})
export class StatisticsComponent {
  @Input() statistics: Statistics;
  @Input() isEvent = true;

  constructor(private statisticsService: StatisticsService) {

  }

  setLike(): void {
    if (this.isEvent) {
      const rqstObj1: LikeRequestObj = {
        liker: 'dmitriy.litvinov@valor-software.com',
        likee: 'test party 1'
      };
      this.statisticsService.setShowLike(rqstObj1)
        .subscribe(res => {
          this.statistics.likes = 100500;
        });

      return;
    }

    // const rqstObj2: LikeRequestObj = {
    //   liker: 'dmitriy.litvinov@valor-software.com',
    //   likee: 'test party 1'
    // };
    // this.statisticsService.setArtistLike(rqstObj2)
    //   .subscribe(res => {
    //     console.log(123);
    //   });
  }
}
