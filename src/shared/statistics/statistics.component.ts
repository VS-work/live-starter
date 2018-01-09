import { Component, Input, OnInit } from '@angular/core';
import { LikeRequestObj, Statistics } from './statistics.interface';
import { StatisticsService } from './statistics.service';
import { User } from '../../edit-profile/user.interface';

@Component({
  selector: 'app-statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['../../my-events/styles.scss', 'statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Input() statistics: Statistics;
  @Input() id: string;
  @Input() isEvent = true;
  user: User;

  constructor(private statisticsService: StatisticsService) {

  }

  ngOnInit() {
    try {
      this.user = JSON.parse(localStorage.getItem('profile'));
    } catch (err) {
      console.log('err: ', err);
    }
  }

  setLike(): void {
    const rqstObj: LikeRequestObj = {
      liker: this.user._id,
      likee: this.id
    };

    if (!this.isEvent) {
      this.statisticsService.setArtistLike(rqstObj)
        .subscribe(res => {
          this.statistics.likes = res.likesCount;
        }, err => {
          console.log('error', err);
        });
      return;
    }

    this.statisticsService.setShowLike(rqstObj)
      .subscribe(res => {
        this.statistics.likes = res.likesCount;
      }, err => {
        console.log('error', err);
      });
  }
}
