import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { LocalStorageService } from '../shared';
import { AuthService } from '../auth';
import { User } from '../signup/user.class';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @ViewChild('staticModal') public staticModal: ModalDirective;

  userProfile: User;


  constructor(private auth: AuthService,
                     private localStorageService: LocalStorageService,
                     private router: Router) {
  }

  ngOnInit() {
    try {
      this.userProfile = new User(JSON.parse(this.localStorageService.getItem('profile')));
    } catch (err) {
      this.userProfile = null;
      console.error('something went wrong: ', err);
    }

    this.localStorageService.getItemEvent().subscribe(userData => {
      if (userData.key !== 'profile') {
        return undefined;
      }

      try {
        this.userProfile = new User(JSON.parse(userData.value));
      } catch (err) {
        this.userProfile = null;
        console.error('something went wrong', err);
      }
    });
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
    if (this.localStorageService.getItem('homePageSearchData')) {
      this.localStorageService.removeItem('homePageSearchData');
    }
  }

  loginModal(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('tempProfile');
    this.staticModal.show();
  }

  closeModal(): void {
    this.staticModal.hide();
  }
}
