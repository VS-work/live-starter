import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';

import { LocalStorageService } from '../shared';
import { AuthService } from '../auth';
import { User } from '../signup/user.class';
import { ShortUserInfo } from '../shared/short-user-info/short-user-info.interface';
import { AuthCreds } from '../auth/authCreds.interface';
import { Pattern } from '../enums/patterns.emum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnDestroy {
  @ViewChild('staticModal') public staticModal: ModalDirective;
  userProfile: User = null;
  isShowSideMenu = false;
  shortUserInfo: ShortUserInfo;
  isHomePage = true;
  userProfileSubscription: Subscription;
  authCreds: AuthCreds = {
    email: '',
    password: ''
  };
  pattern = Pattern;

  constructor(private auth: AuthService,
              private localStorageService: LocalStorageService,
              private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((evt: NavigationStart) => {
        this.isHomePage = evt.url === '/home';
    });

    this.getUser();

    this.userProfileSubscription = this.auth.userProfileEmitter
      .subscribe((user: User) => {
        this.userProfile = user;

        if (!user) {
          return;
        }

        this.shortUserInfo = {
          avatar: user.avatar,
          username: user.username
        };
      });
  }

  getUser(): void {
    try {
      const profile = JSON.parse(this.localStorageService.getItem('profile'));
      if (!profile) {
        this.userProfile = null;
        return;
      }

      this.userProfile = new User(profile);
      this.shortUserInfo = {
        avatar: this.userProfile.avatar,
        username: this.userProfile.username
      };
    } catch (err) {
      this.userProfile = null;
      console.error('something went wrong: ', err);
    }
  }

  hideMenu(): void {
    this.isShowSideMenu = false;
  }

  showMenu(): void {
    this.isShowSideMenu = true;
  }

  logout(evt: Event): void {
    evt.preventDefault();
    this.hideMenu();
    this.auth.logout();
  }

  goToPage(path: string, evt: Event): void {
    evt.preventDefault();
    this.router.navigate([path]);
    this.hideMenu();
    if (this.localStorageService.getItem('homePageSearchData') && path === '/home') {
      this.localStorageService.removeItem('homePageSearchData');
    }
  }

  loginModal(evt: Event): void {
    evt.preventDefault();
    this.hideMenu();
    localStorage.removeItem('id_token');
    localStorage.removeItem('tempProfile');
    this.staticModal.show();
  }

  closeModal(): void {
    this.staticModal.hide();
  }

  googleLogin(): void {
    this.auth.googleLogin();
  }

  facebookLogin(): void {
    this.auth.facebookLogin();
  }

  twitterLogin(): void {
    this.auth.twitterLogin();
  }

  login() {
    this.auth.login(this.authCreds);
  }

  ngOnDestroy() {
    this.userProfileSubscription.unsubscribe();
  }
}
