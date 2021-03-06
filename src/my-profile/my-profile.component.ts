import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ToastOptions, ToastyService } from 'ng2-toasty';

import { CropImageComponent } from '../shared/crop-image/crop-image.component';
import { Pattern } from '../enums/patterns.emum';
import { Notifications } from './notification.model';
import { ChangableData } from './changable-data.model';
import { customToastOptions } from '../shared/models/toasty-options.model';
import { City, Country, DatePickerConfigModel } from '../shared/models';
import { User, UserManagementService, UpdateUserProfileRequestObject } from '../shared/services/user-management-service';
import { UploadFilesService, UploadFile } from '../shared/upload-files';
import { LocationService } from '../shared/services';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnDestroy {
  @ViewChild('cropImgModal', undefined) cropper: CropImageComponent;

  subscriptionManager: Subscription = new Subscription();
  pattern = Pattern;
  currentUser: User;
  changableData: ChangableData;
  dateOfBirthConfig: DatePickerConfigModel = new DatePickerConfigModel({maxDate: new Date(), currentValue: undefined});
  notifications: Notifications;
  countries: Country[] = [];
  cities: City[] = [];
  timePeriods: string[] = ['1hrs', '2hrs', '3hrs', '4hrs', '5hrs'];
  mimeTypes = 'image/gif, image/jpeg, image/pjpeg, image/x-png, image/png, image/svg+xml';


  constructor(private userManagementService: UserManagementService,
              private toastyService: ToastyService,
              private uploadFilesService: UploadFilesService,
              private locationService: LocationService) {
    this.currentUser = this.userManagementService.getUserFromLocalStorage();
    this.setChangableData();
    this.getCountries();
    this.getNoitifications();

    if (this.currentUser.location.city) {
      this.getCities(this.currentUser.location.country.sortname);
    }
  }

  getNoitifications(): void {
    const getUserNotificationsSubscription  = this.userManagementService.getUsersNotifications(this.currentUser._id)
      .subscribe(notifications => {
        this.notifications = notifications;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(getUserNotificationsSubscription);
  }

  getCountries(): void {
    const getCountriesSubscription  = this.locationService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(getCountriesSubscription);
  }

  getCities(countryCode: string): void {
    const getCitiesSubscription  = this.locationService.getCities(countryCode)
      .subscribe(cities => {
        this.cities = cities;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(getCitiesSubscription);
  }

  saveMainDataChanges(form: NgForm): void {
    if (form.invalid || !form.dirty && !this.dateOfBirthConfig.isChanged) {
      return;
    }

    const rqstObj: UpdateUserProfileRequestObject = {
      id: this.currentUser._id,
      updatedData: this.changableData
    };

    const updateUserSubscription = this.userManagementService.updateUser(rqstObj)
      .subscribe(res => {
        this.dateOfBirthConfig.isChanged = false;
        this.currentUser.username = this.changableData.username;
        this.currentUser.email = this.changableData.email;
        this.currentUser.biography = this.changableData.biography;
        this.currentUser.dateOfBirth = this.changableData.dateOfBirth;
        this.currentUser.contacts.phone = this.changableData.contacts.phone;
        this.currentUser.socials = {...this.changableData.socials};
        this.currentUser.location.country = new Country(this.changableData.location.country);
        this.currentUser.location.city = new City(this.changableData.location.city);

        const isEmitUpdateUserAccount = true;
        this.userManagementService.setUserToLocalStorage(this.currentUser, isEmitUpdateUserAccount);

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
      return;
    }

    const rqstObj: UpdateUserProfileRequestObject = {
      id: this.currentUser._id,
      updatedData: this.notifications
    };

    const updateUserNotifications = this.userManagementService.updateUserNotifications(rqstObj)
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
    this.dateOfBirthConfig.currentValue = this.currentUser.dateOfBirth;

    const changableData: ChangableData = {
      username: this.currentUser.username,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      dateOfBirth: this.currentUser.dateOfBirth,
      email: this.currentUser.email,
      biography: this.currentUser.biography,
      contacts: {
        phone: this.currentUser.contacts.phone
      },
      socials: {...this.currentUser.socials},
      location: {...this.currentUser.location}
    };

    this.changableData = new ChangableData(changableData);
  }

  setImgFile($event: Event): void {
    this.cropper.setImage($event);
  }

  saveNewAvatar(fileObj: UploadFile): void {
    fileObj.userId = this.currentUser._id;

    const uploadAvatarSubscription = this.uploadFilesService.uploadAvatar(fileObj)
      .subscribe(res => {
        this.currentUser.avatar = res.imageUrl ? res.imageUrl : this.currentUser.avatar;
        const isEmitUpdateUserAccount = true;
        this.userManagementService.setUserToLocalStorage(this.currentUser, isEmitUpdateUserAccount);

        const toastOptions: ToastOptions = {
          ...customToastOptions,
          ...{title: 'Success', msg: res.message}
        };
        this.toastyService.success(toastOptions);
      });

    this.subscriptionManager.add(uploadAvatarSubscription);
  }

  changeDateOfBirth(date: Date): void {
    if (!this.changableData.dateOfBirth || date.getTime() !== this.changableData.dateOfBirth.getTime()) {
      this.dateOfBirthConfig.isChanged = true;
    }
    const newDate = new Date(date.getTime());
    newDate.setHours(0, 0, 0);
    this.changableData.dateOfBirth = new Date (newDate);
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }

  countryChanged(evt: Country): void {
    this.cities = [];
    this.changableData.location.city = new City();

    this.getCities(evt.sortname);
  }
}
