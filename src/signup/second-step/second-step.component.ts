import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { extend } from 'lodash';
import { ToastOptions, ToastyService } from 'ng2-toasty';

import { SignUpService } from '../signup.service';
import { AuthService } from '../../auth';
import { LocalStorageService, SearchService } from '../../shared';
import { City, Country } from '../../interfaces/country.interface';
import { customToastOptions } from '../../shared/models/toasty-options.model';
import { User } from '../user.class';

@Component({
  selector: 'app-second-step-signup',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.css']
})
export class SecondStepComponent implements OnInit, OnDestroy {
  countries: Country[];
  cities: City[];
  isTypeArtist = false;
  userType = {type: 'fan'};
  userProfile: any; // user data from social networks
  signupServiceSubscribe: Subscription;
  isEmailExistSignupServiceSubscribe: Subscription;
  getLocationsSignupServiceSubscribe: Subscription;
  searchServiceSubscribe: Subscription;
  genres: string[];
  newUser = new User({});

constructor(private signupService: SignUpService,
            private auth: AuthService,
            private searchService: SearchService,
            private userProfileService: LocalStorageService,
            private router: Router,
            private toastyService: ToastyService) {
  }

  ngOnInit() {
    try {
      this.userProfile = JSON.parse(this.userProfileService.getItem('tempProfile'));

      if (this.userProfile) {
        this.newUser.username = this.userProfile.nickname;
        this.newUser.country = this.userProfile.country;
        this.newUser.avatar = this.userProfile.picture;
        this.newUser.firstName = this.userProfile.given_name;
        this.newUser.lastName = this.userProfile.family_name;
        this.newUser.gender = this.userProfile.gender;
        this.newUser.email = this.userProfile.email;
      }
    } catch (err) {
      console.error('something went wrong: ', err);
    }

    this.getLocationsSignupServiceSubscribe = this.signupService.signupGetLocations()
      .subscribe(res => {
        this.countries = res.data.getCountries;
        this.cities = res.data.getCities;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.searchServiceSubscribe = this.searchService.getMusicStyles()
      .subscribe(res => {
        if (res.error) {
          console.error('something went wrong: ', res.error);
          return undefined;
        }

        const styles: any = res.data;
        this.genres = styles.genres;
      });

    this.userProfileService.getItemEvent().subscribe((userData) => {
      try {
        this.userProfile = JSON.parse(userData.value);

        if (this.userProfile) {
          this.newUser.username = this.userProfile.nickname;
          this.newUser.country = this.userProfile.country;
          this.newUser.avatar = this.userProfile.picture;
          this.newUser.firstName = this.userProfile.given_name;
          this.newUser.lastName = this.userProfile.family_name;
          this.newUser.gender = this.userProfile.gender;
          this.newUser.email = this.userProfile.email;
        }
      } catch (err) {
        console.error('something went wrong: ', err);
      }
    });
  }

  public isUserArtist(type: boolean): void {
    this.userType = {type: type ? 'artist' : 'fan'};
    this.isTypeArtist = type;
    extend(this.newUser, this.userType);
  }

  public submitData(): void {
    this.newUser.email = this.userProfile.email;
    this.newUser.type = this.newUser.type || this.userType.type;
    this.newUser.country = this.newUser.country || this.userProfile.country;
    this.newUser.city = this.newUser.city || this.userProfile.city;

    this.isEmailExist(this.newUser.email);
  }

  isEmailExist(email: string): void {
    this.isEmailExistSignupServiceSubscribe = this.signupService.isEmailExist({email})
      .subscribe(res => {
        if (res.success && res.error) {
          const toastOptions: ToastOptions = {...customToastOptions, ...{title: 'Error', msg: res.error}};
          this.toastyService.error(toastOptions);
          return undefined;
        }

        this.signupServiceSubscribe = this.signupService.signupUser(this.newUser)
          .subscribe(user => {
            this.userProfileService.setItem('profile', user);
            this.router.navigate(['/home']);
          }, err => {
            console.error('something went wrong: ', err);
          });
      }, err => {
        console.error('something went wrong: ', err);
      });
  }

  ngOnDestroy() {
    if (this.getLocationsSignupServiceSubscribe) {
      this.getLocationsSignupServiceSubscribe.unsubscribe();
    }

    if (this.isEmailExistSignupServiceSubscribe) {
      this.isEmailExistSignupServiceSubscribe.unsubscribe();
    }

    if (this.signupServiceSubscribe) {
      this.signupServiceSubscribe.unsubscribe();
    }

    localStorage.removeItem('tempProfile');
  }
}
