import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { AuthService } from './auth.service';
import { ShortUserInfo } from '../shared/short-user-info/short-user-info.interface';
import { User } from '../user-service/user.model';
import { Subscription } from 'rxjs/Subscription';
import { MenuItem } from '../header/menuItem.interface';
import { MenuTitles, RouterLinks } from '../enums/router-links.emum';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  @Output() hideMobileMenu: EventEmitter<boolean> = new EventEmitter();

  isAuthenticated = false;
  shortUserInfo: ShortUserInfo;
  userProfile: User;
  subscriptionManager: Subscription = new Subscription();
  mainMenuItems: MenuItem[] = [
    {
      title: MenuTitles.MyProfile,
      link: `/${RouterLinks.MyProfile}`
    },
    {
      title: MenuTitles.MyEvents,
      link: `/${RouterLinks.MyEvents}`
    },
    {
      title: MenuTitles.MyCurrentShows,
      link: `/${RouterLinks.MyCurrentShows}`
    },
    {
      title: MenuTitles.Payments,
      link: `/${RouterLinks.Payments}`
    },
    {
      title: MenuTitles.MyFollowing,
      link: `/${RouterLinks.MyFollowing}`
    }
  ];

  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();

    const loginSubscription = this.authService.loggedIn$.subscribe(result => {
      this.isAuthenticated = result;
    });

    this.subscriptionManager.add(loginSubscription);

    const profileSubscription = this.authService.userProfile$.subscribe(user => {
      this.userProfile = user;

      if (!user) {
        return undefined;
      }

      this.shortUserInfo = {
        avatar: this.userProfile.avatar,
        username: this.userProfile.username
      };
    });

    this.subscriptionManager.add(profileSubscription);
  }

  ngOnInit () {
    this.isAuthenticated = this.authService.authenticated;
  }

  showAuthModal(): void {
    this.hideMobileMenu.emit(true);
    this.authService.showAuthModal();
  }

  showSignUpModal(): void {
    this.hideMobileMenu.emit(true);
    this.authService.showSignUpModal();
  }

  logout(evt: Event): void {
    evt.preventDefault();
    this.hideMobileMenu.emit(true);
    this.authService.logout()
  }

  hideMenu(): void {
    this.hideMobileMenu.emit(true);
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }
}
