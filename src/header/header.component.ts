import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { LocalStorageService } from '../shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isShowSideMenu = false;
  isHomePage = true;

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((evt: NavigationStart) => {
        this.isHomePage = evt.url === '/home';
    });
  }

  hideMenu(): void {
    this.isShowSideMenu = false;
  }

  showMenu(): void {
    this.isShowSideMenu = true;
  }

  goToPage(path: string, evt: Event): void {
    evt.preventDefault();
    this.router.navigate([path]);
    this.hideMenu();

    if (this.localStorageService.getItem('homePageSearchData') && path === '/home') {
      this.localStorageService.removeItem('homePageSearchData');
    }
  }
}
