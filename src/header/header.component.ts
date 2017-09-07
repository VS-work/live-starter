import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

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
  public auth: AuthService;
  private router: Router;

  public constructor(auth: AuthService,
                     localStorageService: LocalStorageService,
                     router: Router) {
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

  public goToHomePage(): void {
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
}
