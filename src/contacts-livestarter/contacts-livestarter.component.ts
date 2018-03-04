import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ToastOptions, ToastyService } from 'ng2-toasty';

import { ContactsInfo } from './contacts-info.interface';
import { Pattern } from '../enums/patterns.emum';
import { ContactsLivestarterService } from './contacts-livestarter.service';
import { CallbackForm } from './callbackForm.model';
import { customToastOptions } from '../shared/models/toasty-options.model';
import { User } from '../user-service/user.model';
import { USER_TYPES, UserType } from '../user-service/user-type.model';

@Component({
  selector: 'app-contacts-livestarter-component',
  templateUrl: './contacts-livestarter.component.html',
  styleUrls: ['./contacts-livestarter.component.scss']
})

export class ContactsLiveStarterComponent implements OnDestroy {
  contactsInfo: ContactsInfo = {
    address: 'Pittsburgh, PA USA',
    email: 'info@livestarter.com'
  };

  callbackForm: CallbackForm = new CallbackForm();
  callbackSubscribe: Subscription;

  userTypes: UserType[] = USER_TYPES;
  pattern = Pattern;
  checkedType: UserType;
  userProfile: User;

  constructor(private contactsService: ContactsLivestarterService, private toastyService: ToastyService) {
    this.getUserProfile();
    this.setCheckedType();
  }

  ngOnDestroy() {
    if (this.callbackSubscribe) {
      this.callbackSubscribe.unsubscribe()
    }
  }

  getUserProfile(): void | undefined {
    try {
      const profile = localStorage.getItem('profile');

      if (!profile) {
        this.userProfile = null;
        this.callbackForm = new CallbackForm();

        return undefined;
      }

      const userProfile = JSON.parse(profile);
      this.userProfile = new User(userProfile);

      const rqstObj: CallbackForm = {
        fullname: `${this.userProfile.firstName} ${this.userProfile.lastName}`,
        email: this.userProfile.email,
        type: this.userProfile.type,
        message: ''
      };

      this.callbackForm = new CallbackForm(rqstObj);
    } catch (err) {
      this.userProfile = null;
      this.callbackForm = new CallbackForm();
      console.error('something went wrong: ', err);
    }
  }

  setCheckedType(): void | undefined {
    const index = this.userProfile ? this.userTypes.findIndex(item => item.type === this.userProfile.type) : 0;

    this.checkedType = this.userTypes[index];
  }

  submitForm(form: NgForm): void | undefined {
    if (form.invalid) {
      return undefined;
    }

    this.callbackForm.type = this.checkedType.type;

    this.callbackSubscribe = this.contactsService.sendCallbackForm(this.callbackForm).subscribe(res => {
      const toastOptions: ToastOptions = {
        ...customToastOptions,
        ...{title: res.title, msg: res.message}
      };
      this.toastyService.success(toastOptions);

      form.reset();
      this.callbackForm = new CallbackForm()
    }, err => {
      const toastOptions: ToastOptions = {
        ...customToastOptions,
        ...{title: err.title, msg: err.message}
      };
      this.toastyService.error(toastOptions);
    });
  }
}
