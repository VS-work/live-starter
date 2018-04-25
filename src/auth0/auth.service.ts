import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import Auth0Lock from 'auth0-lock';

import { AUTH_CONFIG } from './auth.config';
import { Config } from '../app.config';
import { User, UserService } from '../shared/services/user-service';
import { ParsedProfile } from './parsed-profile.interface';

interface CustomAuthResult extends AuthResult {
  expiresIn?: number
}

@Injectable()
export class AuthService implements OnDestroy {
  lock = new Auth0Lock(AUTH_CONFIG.CLIENT_ID, AUTH_CONFIG.CLIENT_DOMAIN, {
    autoclose: true,
    auth: {
      redirectUrl: '',
      responseType: AUTH_CONFIG.RESPONSE_TYPE,
      audience: AUTH_CONFIG.AUDIENCE,
      params: {
        scope: AUTH_CONFIG.SCOPE
      }
    },
    languageDictionary: {title: ''},
    theme: {
      logo: `${Config.frontendPath}/assets/img/logo.png`
    }
  });

  loggedIn = false;
  userProfile: User;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  userProfile$ = new BehaviorSubject<User>(this.userProfile);
  subscriptionManager: Subscription = new Subscription();

  constructor(private router: Router,
              private userService: UserService) {
    this.isAuthenticated();

    const updateAccountSubscription = this.userService.updateUserAccount;
    updateAccountSubscription
      .subscribe((res: boolean): void => {
        const userFromLocalStorage = this.userService.getUserFromLocalStorage();

        if (!res || !userFromLocalStorage) {
          return;
        }

        const isUpdateLocalstorage = false;

        this.setUserProfile(userFromLocalStorage, isUpdateLocalstorage);
      });
  }

  showAuthModal(): void {
    this.lock.show();
  }

  showSignUpModal(): void {
    this.lock.show({initialScreen: 'signUp'});
  }

  handleAuthentication(): void {
    this.lock.on('authenticated', authResult => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.getProfile(authResult);
      }
    });
  }

  setUserProfile(profile?: User, isUpdateToLocalstorage = true): void {

    this.userProfile = profile ? new User(profile) : null;
    this.userProfile$.next(this.userProfile);

    if (profile && isUpdateToLocalstorage) {
      this.userService.setUserToLocalStorage(profile);
    }
  }

  setSession(authResult: CustomAuthResult, profile: auth0.Auth0UserProfile): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const tempProfile = JSON.stringify(profile);

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('tempProfile', tempProfile);
  }

  getProfile(authResult: CustomAuthResult): void {
    this.lock.getProfile(authResult.accessToken, (err: auth0.Auth0Error, profile: auth0.Auth0UserProfile) => {
      if (err) {
        console.error('something went wrong: ', err);
        this.setLoggedIn(false);
        this.logout();
      } else {
        this.setLoggedIn(true);
        this.setSession(authResult, profile);
        this.isUserExist(profile);
      }
    });
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('auth0.ssodata');
    localStorage.removeItem('tempProfile');
    localStorage.removeItem('profile');

    this.setLoggedIn(false);
    this.setUserProfile();
  }

  get authenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  isAuthenticated(): void {
    if (this.authenticated) {
      this.setLoggedIn(true);
      const profile = localStorage.getItem('profile');

      if (profile) {
        try {
          const userProfile = JSON.parse(profile);
          this.setUserProfile(userProfile);
        } catch (e) {
          this.logout();
          console.error('something went wrong: ', e);
        }

        return;
      }

      const tempProfile = localStorage.getItem('tempProfile');

      if (tempProfile) {
        try {
          const userTempProfile = JSON.parse(tempProfile);

          const userSubscribe = this.userService.getUser({email: userTempProfile.email})
          .subscribe((user: User) => {
            this.setUserProfile(user);
          });
        } catch (e) {
          this.logout();
          console.error('something went wrong: ', e);
        }

        return;
      }

      return;
    }

    this.logout();
  }

  isUserExist(profile: auth0.Auth0UserProfile): void {
    this.userService.isEmailExist({email: profile.email})
      .subscribe(res => {
        if (res.isAlreadyExist) {
          const userSubscribe = this.userService.getUser({email: profile.email})
            .subscribe((user: User) => {
              this.setUserProfile(user);
            });

          this.subscriptionManager.add(userSubscribe);

          return;
        }

        const parsedUser: ParsedProfile = this.parseProfile(profile);
        const subscribeUser = this.userService.signupUser(parsedUser)
          .subscribe((user: User) => {
            this.setUserProfile(user);

            this.router.navigate(['/edit-profile']);
          }, err => {
            console.error('something went wrong: ', err);
          });

        this.subscriptionManager.add(subscribeUser);

      });
  }

  parseProfile(profile: auth0.Auth0UserProfile): ParsedProfile {
    return {
      email: profile.email,
      avatar: profile.picture,
      username: profile.nickname,
      firstName: profile.given_name ? profile.given_name : '',
      lastName: profile.family_name ? profile.family_name : '',
      gender: profile.gender ? profile.gender : null
    }
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }
}
