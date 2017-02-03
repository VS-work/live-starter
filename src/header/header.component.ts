import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

import { Config } from '../app.config';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../auth/localStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @ViewChild('staticModal') public staticModal: ModalDirective;

  public userProfile: any;

  public menuItems: any[] = ['Artists', 'Genres', 'How it works', 'Fund', 'Blog', 'Contact'];
  public userProfileService: LocalStorageService;

  private auth: AuthService;
  private router: Router;

  public constructor(auth: AuthService, userProfileService: LocalStorageService, router: Router) {
    this.auth = auth;
    this.router = router;
    this.userProfileService = userProfileService;
  }

  public ngOnInit(): void {
    const userProfile: any = this.userProfileService.getItem('profile');

    if (userProfile) {
      this.userProfile = JSON.parse(userProfile);
    }

    this.userProfileService.getItemEvent().subscribe((userData) => {
      this.userProfile = JSON.parse(userData.value);
    });
  }

  public goToTop(e: MouseEvent): void {
    this.scrollTop(e);
    this.router.navigate(['/home']);
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

  public routeTo(route: string): void {

    const redirectTo = route.toLowerCase();
    console.log('route: ', redirectTo);
    this.router.navigate(['/' + redirectTo]);
  }
}
