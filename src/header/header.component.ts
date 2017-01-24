import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../auth/userProfile.service';

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

  public constructor(auth: AuthService, userProfileService: LocalStorageService) {
    this.auth = auth;
    this.userProfileService = userProfileService;
  }

  public ngOnInit(): void {
    const userProfile: any = this.userProfileService.getItem('profile');

    if (userProfile) {
      this.userProfile = JSON.parse(userProfile);
    }

    this.userProfileService.getItemEvent().subscribe((red) => {
      this.userProfile = JSON.parse(red.value);
    });
  }
}
