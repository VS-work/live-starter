import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { LocalStorageService } from '../shared';

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

    this.auth0.parseHash(window.location.hash, (err: Error, authResult: any): void => {
      if (err) {
        return console.log(err);
      }

      Auth0.userInfo(authResult.accessToken, (cliErr: Error, user: any): void => {
        if (cliErr) {
          return console.log(cliErr);
        }
        // Now you have the user's information
        let result = user;
        if (result && result.idToken) {
          localStorage.setItem('id_token', result.idToken);
          this.router.navigate(['/home']);
        } else if (result && result.error) {
          alert('error: ' + result.error);
        }
      });
    });

    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    this.lock.on('authenticated', (authResult: any): void => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: Error, profile: any): void => {
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

  public login(username: string, password: string): void {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, (err: Error): void => {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public signUp(username: string, password: string): void {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
      // callbackURL: 'http://localhost:4200/second-step'
      callbackURL: 'https://livestarter-bf456.firebaseapp.com/second-step'
    }, (err: Error): void => {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public googleLogin(): void {
    this.auth0.login({
      connection: 'google-oauth2'
    }, (err: Error): void => {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public googleSignup(): void {
    this.auth0.login({
      connection: 'google-oauth2',
      callbackURL: 'https://livestarter-bf456.firebaseapp.com/second-step'
      // callbackURL: 'http://localhost:4200/second-step'
    }, (err: Error): void => {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public facebookLogin(): void {
    this.auth0.login({
      connection: 'facebook'
    }, (err: Error): void => {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public twitterLogin(): void {
    this.auth0.login({
      connection: 'twitter'
    }, (err: Error): void => {
      if (err) {
        alert('something went wrong: ' + err.message);
      }
    });
  }

  public logout(): void {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.userProfile = undefined;
  }

  public authenticated(): any {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token' by default
    return tokenNotExpired();
  }
}
