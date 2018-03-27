import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ToastOptions, ToastyService } from 'ng2-toasty';

import { Pattern } from '../enums/patterns.emum';
import { User } from '../user-service/user.model';
import { Notifications } from './notification.model';
import { UserService } from '../user-service/user.service';
import { ChangableData } from './changable-data.model';
import { customToastOptions } from '../shared/models/toasty-options.model';
import { UpdateUserProfileRequestObject } from '../user-service/update-user-profile.interface';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnDestroy {
  subscriptionManager: Subscription = new Subscription();
  pattern = Pattern;
  currentUser: User;
  changableData: ChangableData;
  notifications: Notifications;
  timePeriods: string[] = ['1hrs', '2hrs', '3hrs', '4hrs', '5hrs'];

  constructor(private userService: UserService, private toastyService: ToastyService) {
    this.currentUser = this.userService.getUserFromLocalStorage();

    const getUserNotificationsSubscription  = this.userService.getUsersNotifications(this.currentUser._id)
      .subscribe(notifications => {
        this.notifications = notifications;
      }, err => {
        console.error('something went wrong: ', err);
      });
    this.setChangableData();

    this.subscriptionManager.add(getUserNotificationsSubscription);
  }

  saveMainDataChanges(form: NgForm): void | undefined {
    if (form.invalid || !form.dirty) {
      return undefined;
    }

    const rqstObj: UpdateUserProfileRequestObject = {
      id: this.currentUser._id,
      updatedData: this.changableData
    };

    const updateUserSubscription = this.userService.updateUser(rqstObj)
      .subscribe(res => {
        this.currentUser.username = this.changableData.username;
        this.currentUser.email = this.changableData.email;
        this.currentUser.biography = this.changableData.biography;
        this.currentUser.contacts.phone = this.changableData.contacts.phone;
        this.currentUser.socials = {...this.changableData.socials};

        this.userService.setUserToLocalStorage(this.currentUser);

        const toastOptions: ToastOptions = {
          ...customToastOptions,
          ...{title: 'Success', msg: res.message}
        };
        this.toastyService.success(toastOptions);
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(updateUserSubscription);
  }

  saveNotifications(form: NgForm): void {
    if (form.invalid || !form.dirty) {
      return undefined;
    }

    const rqstObj: UpdateUserProfileRequestObject = {
      id: this.currentUser._id,
      updatedData: this.notifications
    };

    const updateUserNotifications = this.userService.updateUserNotifications(rqstObj)
      .subscribe(res => {
        const toastOptions: ToastOptions = {
          ...customToastOptions,
          ...{title: 'Success', msg: res.message}
        };
        this.toastyService.success(toastOptions);
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(updateUserNotifications);
  }

  setChangableData(): void {
    const changableData: ChangableData = {
      username: this.currentUser.username,
      email: this.currentUser.email,
      biography: this.currentUser.biography,
      contacts: {
        phone: this.currentUser.contacts.phone
      },
      socials: {...this.currentUser.socials}
    };

    this.changableData = new ChangableData(changableData);
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }
}
