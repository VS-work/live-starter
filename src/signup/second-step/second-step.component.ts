import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { extend } from 'lodash';

import { SignUpService } from '../signup.service';
import { AuthService } from '../../auth';
import { LocalStorageService, SearchService } from '../../shared';

interface INewUser {
  active: boolean;
  avatar: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  role: string;
  type: string;
  position: string;
  city: string;
  country: string;
  viewers: any[];
  appreciations: any[];
  followers: any[];
  followings: any[];
  website: string;
  joinDate: Date;
  biography: string;
  contacts: {
    phone: string;
    skype: string;
    hangouts: string;
  };
  shows: any[];
  socials: {
    google: string;
    facebook: string;
    twitter: string;
  };
  comments: any[];
  reviews: any[];
  video: any[];
  audio: any[];
  photo: any[];
  genres: any[];
  groupName: string;
}

@Component({
  selector: 'app-second-step-signup',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.css']
})
export class SecondStepComponent implements OnInit, OnDestroy {
  public newUser: INewUser;
  public userErrorMessage: string;
  public countries: any;
  public cities: any;
  public isTypeArtist = false;
  public userType: any = {type: 'fan'};
  public userProfile: any;

  public userProfileService: LocalStorageService;
  public signupServiceSubscribe: Subscription;
  public isEmailExistSignupServiceSubscribe: Subscription;
  public getLocationsSignupServiceSubscribe: Subscription;
  public searchService: SearchService;
  public searchServiceSubscribe: Subscription;
  public genres: any;
  public signupService: SignUpService;
  private auth: AuthService;
  private router: Router;

  public constructor(signupService: SignUpService,
                     auth: AuthService,
                     searchService: SearchService,
                     userProfileService: LocalStorageService,
                     router: Router) {
    this.userProfileService = userProfileService;
    this.signupService = signupService;
    this.searchService = searchService;
    this.auth = auth;
    this.router = router;
  }

  public ngOnInit(): void {
    const userProfile: any = this.userProfileService.getItem('profile');

    this.newUser = {
      active: true,
      avatar: '',
      username: '',
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      role: 'user',
      type: '',
      position: '',
      city: '',
      country: '',
      viewers: [],
      appreciations: [],
      followers: [],
      followings: [],
      website: '',
      joinDate: new Date(),
      biography: 'User was born and seems that he is alive yet.',
      contacts: {
        phone: '',
        skype: '',
        hangouts: ''
      },
      shows: [],
      socials: {
        google: '',
        facebook: '',
        twitter: ''
      },
      comments: [],
      reviews: [],
      video: [],
      audio: [],
      photo: [],
      genres: [],
      groupName: ''
    };

    this.getLocationsSignupServiceSubscribe = this.signupService.signupGetLocations()
      .subscribe((res): void => {
        const locations = res.data;

        this.countries = locations.getCountries;
        this.cities = locations.getCities;
      });

    this.searchServiceSubscribe = this.searchService.getMusicStyles()
      .subscribe((res: any): void => {
        const styles: any = res.data;
        this.genres = styles.genres;
      });

    if (userProfile) {
      this.userProfile = JSON.parse(userProfile);
      this.newUser.username = userProfile.name;
      this.newUser.country = userProfile.country;
    }

    this.userProfileService.getItemEvent().subscribe((userData) => {
      this.userProfile = JSON.parse(userData.value);
      this.newUser.username = this.userProfile.name;
      this.newUser.country = this.userProfile.country;
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
    this.newUser.city =  this.newUser.city || this.userProfile.city;

    this.signupServiceSubscribe = this.signupService.signupUser(this.newUser)
      .subscribe((): void => {
        this.router.navigate(['/home']);
      });
  }

  public ngOnDestroy(): void {
    if (this.getLocationsSignupServiceSubscribe) {
      this.getLocationsSignupServiceSubscribe.unsubscribe();
    }

    if (this.isEmailExistSignupServiceSubscribe) {
      this.isEmailExistSignupServiceSubscribe.unsubscribe();
    }

    if (this.signupServiceSubscribe) {
      this.signupServiceSubscribe.unsubscribe();
    }
  }
}
