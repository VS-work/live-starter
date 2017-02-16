import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap';
import * as _ from 'lodash';
import { AuthService } from '../../auth/auth.service';

import { SignUpService } from './signup.modal.service';
import { SearchService } from '../../shared/search/search.service';
import { LocalStorageService } from '../../auth/localStorage.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: '././signup.modal.component.html',
  styleUrls: ['./signup.modal.component.css']
})
export class SignUpModalComponent implements OnInit, OnDestroy {
  @ViewChild('staticModal') public staticModal: ModalDirective;

  public signupForm: any = {};
  public userErrorMessage: string;

  public firstStepSuccess = false;
  public isTypeArtist = false;
  public userType: any;
  public countries: any;
  public cities: any;
  public userProfile: any;

  public signupService: SignUpService;
  public userProfileService: LocalStorageService;
  public signupServiceSubscribe: Subscription;
  public isEmailExistSignupServiceSubscribe: Subscription;
  public getLocationsSignupServiceSubscribe: Subscription;

  public searchService: SearchService;
  public searchServiceSubscribe: Subscription;
  public genres: any;

  private auth: AuthService;

  public constructor(signupService: SignUpService,
                     searchService: SearchService,
                     auth: AuthService,
                     userProfileService: LocalStorageService) {
    this.signupService = signupService;
    this.searchService = searchService;
    this.userProfileService = userProfileService;
    this.auth = auth;
  }

  public ngOnInit(): void {
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
  }

  public closeModal(): void {
    this.staticModal.hide();
    this.userErrorMessage = '';
    this.signupForm = {};
    this.firstStepSuccess = false;
  }

  public isUserArtist(type: boolean): void {
    this.userType = {type: type ? 'artist' : 'fan'};
    this.isTypeArtist = type;
    _.extend(this.signupForm, this.userType);
  }

  public getUserSocialProfile(): void {
    const userProfile: any = this.userProfileService.getItem('profile');

    if (userProfile) {
      this.userProfile = JSON.parse(userProfile);
    }

    this.userProfileService.getItemEvent().subscribe((userData) => {
      this.userProfile = JSON.parse(userData.value);
    });

  }

  public socialLogin(socialType): void {
    switch (socialType) {
      case 'google':
        this.auth.googleSignup();
        break;

      case 'facebook':
        console.log('Login via ', socialType);
        break;

      case 'twitter':
        console.log('Login via ', socialType);
        break;
    }

    this.closeModal();
  }

  public isEmailExist(credentials: any): void {
    const signupData = {
      email: credentials.email,
      type: credentials.type,
      password: credentials.password
    };

    this.isEmailExistSignupServiceSubscribe = this.signupService.isEmailExist(signupData)
      .subscribe((res: any) => {
        const emailError: any = res.err;

        if (emailError) {
          this.signupForm.password = '';
          this.signupForm.passwordConfirm = '';
          this.userErrorMessage = emailError;
          return;
        }
        this.signupForm = {
          email: signupData.email,
          password: signupData.password,
          type: 'fan',
          country: '',
          city: '',
          genres: '',
          username: ''
        };
        this.userErrorMessage = '';
        this.firstStepSuccess = true;
      });
  }

  public submitData(): void {
    this.signupServiceSubscribe = this.signupService.signupUser(this.signupForm)
      .subscribe((): void => {
        this.auth.signUp(this.signupForm.email, this.signupForm.password);
        this.staticModal.hide();
        this.signupForm = {};
        this.userErrorMessage = '';
        this.firstStepSuccess = false;
      });
  }

  public ngOnDestroy(): void {
    this.getLocationsSignupServiceSubscribe.unsubscribe();
    this.isEmailExistSignupServiceSubscribe.unsubscribe();
    this.signupServiceSubscribe.unsubscribe();
  }
}
