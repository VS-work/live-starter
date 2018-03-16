import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { LocalStorageService } from '../shared';
import { MenuItem } from './menuItem.interface';
import { MenuTitles, RouterLinks } from '../enums/router-links.emum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  isShowSideMenu = false;
  isHomePage = true;
  mainMenuItems: MenuItem[] = [
    {
      title: MenuTitles.Artists,
      link: `/${RouterLinks.Artists}`
    },
    {
      title: MenuTitles.Events,
      link: `/${RouterLinks.Events}`
    },
    {
      title: MenuTitles.HowItWorks,
      link: `/${RouterLinks.HowItWorks}`
    },
    {
      title: MenuTitles.CreateEvent,
      link: `/${RouterLinks.CreateEvent}`
    },
    {
      title: MenuTitles.Blog,
      link: `/${RouterLinks.Blog}`
    },
    {
      title: MenuTitles.Contact,
      link: `/${RouterLinks.Contact}`
    },
  ];

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
