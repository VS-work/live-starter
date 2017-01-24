import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { LocalStorageService } from './userProfile.service';

declare let Auth0: any;
declare let Auth0Lock: any;

@Injectable()
export class AuthService {
  private router: Router;
  private auth0 = new Auth0({
    domain: 'livestarter.auth0.com',
    clientID: 'uifmleRQ8rEy786KhjfNsfyCCrqnDMpc',
    responseType: 'token',
    callbackURL: ''
  });

  private lock = new Auth0Lock('uifmleRQ8rEy786KhjfNsfyCCrqnDMpc', 'livestarter.auth0.com', {});

  private userProfile: any;

  public userProfileService: LocalStorageService;

  constructor(router: Router, userProfileService: LocalStorageService) {
    this.router = router;
    this.userProfileService = userProfileService;

    let result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.router.navigate(['/home']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }

    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        this.userProfileService.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }

  public login(username, password) {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, function (err) {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public signUp(username, password) {

    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, function (err) {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function (err) {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.userProfile = undefined;
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token' by default
    return tokenNotExpired();
  }
}
