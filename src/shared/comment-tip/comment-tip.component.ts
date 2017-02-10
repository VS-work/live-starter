import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-tip',
  templateUrl: './comment-tip.component.html',
  styleUrls: ['./comment-tip.component.css']
})
export class CommentTipComponent {
  @Input()
  public currentUser: any;

  public fan =
    { avatar: '//s-media-cache-ak0.pinimg.com/originals/2f/1c/ee/2f1cee39bfc1d4588ce3c55ae1e90030.png',
      username: 'sam.barum',
      firstName: 'Sam',
      lastName: 'Barum',
      type: 'fan'};
  public router: Router;

  public constructor(router: Router) {
    this.router = router;
  }

  public goToFanPage(artistName: string): void {
    if (artistName !== this.fan.username) {
      return;
    }

    this.router.navigate(['fan-profile']);
  }
}
