import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { SignUpService } from '../../header/signup-modal/signup.modal.service';
import * as _ from 'lodash';
import { AuthService } from '../../auth/auth.service';

import { LocalStorageService } from '../../auth/localStorage.service';

@Component({
  selector: 'app-first-step-signup',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.css']
})
export class FirstStepComponent implements OnInit, OnDestroy {
  public signupForm: any = {};
  public userErrorMessage: string;

  public userProfileService: LocalStorageService;
  public signupServiceSubscribe: Subscription;
  public isEmailExistSignupServiceSubscribe: Subscription;
  public getLocationsSignupServiceSubscribe: Subscription;

  public signupService: SignUpService;
  public genres: any;
  private auth: AuthService;
  private router: Router;

  public constructor(signupService: SignUpService,
                     auth: AuthService,
                     userProfileService: LocalStorageService,
                     router: Router) {
    this.userProfileService = userProfileService;
    this.signupService = signupService;
    this.auth = auth;
    this.router = router;
  }

  public ngOnInit(): void {
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


        this.auth.signUp(signupData.email, signupData.password);
        this.userErrorMessage = '';
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
