import { Component, Input } from '@angular/core';

import { ShortUserInfo } from './short-user-info.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-short-user-info',
  templateUrl: './short-user-info.component.html',
  styleUrls: ['./short-user-info.component.scss']
})
export class ShortUserInfoComponent {
  @Input() info: ShortUserInfo;

  constructor(private router: Router) {

  }

  goToUserProfile(): void {
    if (this.info && !this.info.userProfileLink) {
      return;
    }
    this.router.navigate([this.info.userProfileLink.routerLink], {queryParams: this.info.userProfileLink.queryParams});
  }
}
