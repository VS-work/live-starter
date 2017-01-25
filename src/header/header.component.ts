import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../auth/localStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
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

  public goToMain(): void {
    this.router.navigate(['/home']);
  }
}
