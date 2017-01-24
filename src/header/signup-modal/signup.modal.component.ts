import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap';
import * as _ from 'lodash';
import { AuthService } from '../../auth/auth.service';

import { SignUpService } from './signup.modal.service';
import { SearchService } from '../../shared/search/search.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: '././signup.modal.component.html',
  styleUrls: ['./signup.modal.component.css']
})
export class SignUpModalComponent implements OnInit, OnDestroy {
  @ViewChild('staticModal') public staticModal: ModalDirective;

  public signupForm: any = {};
  public userErrorMessage: string;

  public firstStepSuccess: boolean = false;
  public isTypeArtist: boolean = false;
  public userType: any;
  public countries: any;
  public cities: any;

  public signupService: SignUpService;
  public signupServiceSubscribe: Subscription;
  public isEmailExistSignupServiceSubscribe: Subscription;
  public getLocationsSignupServiceSubscribe: Subscription;

  public searchService: SearchService;
  public searchServiceSubscribe: Subscription;
  public genres: any;

  private auth: AuthService;

  public constructor(signupService: SignUpService,
                     searchService: SearchService,
                     auth: AuthService) {
    this.signupService = signupService;
    this.searchService = searchService;
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
        const styles: any[] = res.data;
        this.genres = styles[0].genres;
      });
  }

  public closeModal(): void {
    this.staticModal.hide();
    this.userErrorMessage = '';
    this.signupForm = {};
    this.firstStepSuccess = false;
  }

  public backToFisrtStep(): void {
    this.firstStepSuccess = !this.firstStepSuccess;
    this.signupForm.password = '';
    this.signupForm.passwordConfirm = '';
  }

  public isUserArtist(type: boolean): void {
    this.userType = {type: type ? 'artist' : 'fan'};
    this.isTypeArtist = type;
    _.extend(this.signupForm, this.userType);
  }

  public socialLogin(socialType): void {
    console.log('Login via ', socialType);
    this.closeModal();
  }

  public isEmailExist(credentials: any): void {
    const signupData = {
      email: credentials.email,
      type: credentials.type,
      password: credentials.password
    };

    if (credentials.password !== credentials.passwordConfirm) {
      this.userErrorMessage = 'Confirmed password does not match password.';
      return;
    }

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
