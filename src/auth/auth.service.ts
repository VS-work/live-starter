import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { LocalStorageService } from '../shared';
import { SignUpService } from '../signup/signup.service';
import { Config } from '../app.config';
import { User } from '../signup/user.class';

declare let Auth0: any;
declare let Auth0Lock: any;

interface UserSocialNetworkObj {
  [key: string]: any;
}

@Injectable()
export class AuthService {
  private auth0 = new Auth0({
    domain: 'livestarter.auth0.com',
    clientID: 'uifmleRQ8rEy786KhjfNsfyCCrqnDMpc',
    responseType: 'token',
    callbackURL: ''
  });
  private lock = new Auth0Lock('uifmleRQ8rEy786KhjfNsfyCCrqnDMpc', 'livestarter.auth0.com', {});
  private userProfile: User;

  constructor(private router: Router, private userProfileService: LocalStorageService, private signUpService: SignUpService) {
    this.auth0.parseHash(window.location.hash, (err: Error, authResult: UserSocialNetworkObj): void | undefined => {
      if (err) {
        console.error('something went wrong: ', err);
        return undefined;
      }

      Auth0.userInfo(authResult.accessToken, (cliErr: Error, user: UserSocialNetworkObj): void | undefined => {
        if (cliErr) {
          console.log(cliErr);
          return undefined;
        }
        // Now you have the user's information
        const result = user;
        if (result && result.idToken) {
          localStorage.setItem('id_token', result.idToken);
          this.router.navigate(['/home']);
        } else if (result && result.error) {
          console.error('something went wrong: ', result.error);
        }
      });
    });
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    this.lock.on('authenticated', (authResult: UserSocialNetworkObj) => {
      const isLogin = localStorage.getItem('isLogin');

      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: Error, profile: UserSocialNetworkObj): void | undefined => {
        if (error) {
          // Handle error
          console.error('something went wrong', error);
          return undefined;
        }

        this.userProfileService.setItem('tempProfile', profile);

        if (isLogin) {
          this.signUpService.getUser({email: profile.email})
            .subscribe(res => {
              localStorage.removeItem('tempProfile');
              localStorage.removeItem('isLogin');

              this.userProfileService.setItem('profile', res.data);
              this.userProfile = res;
            }, err => {
              console.error('something went wrong', err);
            });
        }
      });
    });
  }

  public login(username: string, password: string): void {
    localStorage.setItem('isLogin', JSON.stringify(true));

    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, (err: Error): void => {
      if (err) {
        console.error('something went wrong: ', err.message);
      }
    });
  }

  public signUp(username: string, password: string): void {
    localStorage.removeItem('isLogin');

    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
      callbackURL: `${Config.frontendPath}/second-step`
    }, (err: Error): void => {
      if (err) {
        console.error('something went wrong: ', err.message);
      }
    });
  }

  public googleLogin(): void {
    localStorage.setItem('isLogin', JSON.stringify(true));

    this.auth0.login({
      connection: 'google-oauth2'
    }, (err: Error): void => {
      if (err) {
        console.error('something went wrong: ', err.message);
      }
    });
  }

  public googleSignup(): void {
    localStorage.removeItem('isLogin');

    this.auth0.login({
      connection: 'google-oauth2',
      callbackURL: `${Config.frontendPath}/second-step`
    }, (err: Error): void => {
      if (err) {
        console.error('something went wrong: ', err.message);
      }
    });
  }

  public facebookLogin(): void {
    localStorage.setItem('isLogin', JSON.stringify(true));

    this.auth0.login({
      connection: 'facebook'
    }, (err: Error): void => {
      if (err) {
        console.error('something went wrong: ', err.message);
      }
    });
  }

  public twitterLogin(): void {
    localStorage.setItem('isLogin', JSON.stringify(true));

    this.auth0.login({
      connection: 'twitter'
    }, (err: Error): void => {
      if (err) {
        console.error('something went wrong: ', err.message);
      }
    });
  }

  public logout(): void {
    localStorage.removeItem('isLogin');
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
