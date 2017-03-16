import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { Config } from '../app.config';
import { LocalStorageService } from '../shared';
import { AuthService } from '../auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @ViewChild('staticModal') public staticModal: ModalDirective;

  public userProfile: any;
  public localStorageService: LocalStorageService;
  private auth: AuthService;
  private router: Router;

  public constructor(auth: AuthService, localStorageService: LocalStorageService, router: Router) {
    this.auth = auth;
    this.router = router;
    this.localStorageService = localStorageService;
  }

  public ngOnInit(): void {
    const userProfile: any = this.localStorageService.getItem('profile');

    if (userProfile) {
      this.userProfile = JSON.parse(userProfile);
    }

    this.localStorageService.getItemEvent().subscribe((userData: any) => {
      if (userData.key !== 'profile') {
        return;
      }

      this.userProfile = JSON.parse(userData.value);
    });
  }

  public goToTop(e: MouseEvent): void {
    this.scrollTop(e);
    this.router.navigate(['/home']);

    if (this.localStorageService.getItem('homePageSearchData')) {
      this.localStorageService.removeItem('homePageSearchData');
    }
  }

  public loginModal(): void {
    this.staticModal.show();
  }

  public closeModal(): void {
    this.staticModal.hide();
  }

  public scrollTop(e: MouseEvent): void {
    e.preventDefault();
    Config.animateScroll('scrollBackToTop', 20, 1000);
  };
}
