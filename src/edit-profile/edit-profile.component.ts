import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { EditProfileService } from './edit-profile.service';
import { LocalStorageService, SearchService } from '../shared';

@Component({
  selector: 'app-edit-profile-component',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  public editProfileService: EditProfileService;
  public editProfileServiceSubscribe: Subscription;
  public editProfileAdditionalServiceSubscribe: Subscription;
  public editProfileAvatarServiceSubscribe: Subscription;
  public getProfileServiceSubscribe: Subscription;
  public userProfileService: LocalStorageService;
  public searchService: SearchService;
  public getLocationsSubscribe: Subscription;
  public getGenresSubscribe: Subscription;
  public checkModel: any;
  public user: any;
  public localStorageUserProfile: any;
  public countries: any[];
  public genders: any[];
  public positions: any[];
  public genres: any[];
  public userUpdateSuccess: boolean;

  @ViewChild('smModal') public smModal: ModalDirective;

  public constructor(editProfileService: EditProfileService,
                     userProfileService: LocalStorageService,
                     searchService: SearchService) {
    this.editProfileService = editProfileService;
    this.userProfileService = userProfileService;
    this.searchService = searchService;
  }

  public ngOnInit(): void {
    this.genders = ['male', 'female', 'other'];
    this.positions = ['Singer', 'Song Writer', 'Actor', 'Musician', 'Poet'];

    this.checkModel = {
      showAlreadyBegun: true,
      showBeginIn: false,
      followingArtistCreatesNewEvent: true,
      recommendedArtitsShows: true,
      featuredShows: false,
      alertIfMessage: true
    };

    const userProfile: any = this.userProfileService.getItem('profile');
    if (userProfile) {
      this.localStorageUserProfile = JSON.parse(userProfile);
    }

    this.userProfileService.getItemEvent().subscribe((userData) => {
      this.localStorageUserProfile = JSON.parse(userData.value);
    });

    if (this.localStorageUserProfile.email) {
      this.getUser(this.localStorageUserProfile.email);
    }

    this.getLocationsSubscribe = this.searchService.getLocations()
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.countries = res.data;
      });

    this.getGenresSubscribe = this.searchService.getMusicStyles()
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.genres = res.data.genres;
      });
  }

  public changeAvatarLink(newLink: string): void {
    const newAvatarLink: any = {newAvatarLink: newLink, email: this.user.email};

    this.editProfileAvatarServiceSubscribe = this.editProfileService.editUserAvatar(newAvatarLink)
      .subscribe((res): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }

        this.getUser(this.localStorageUserProfile.email);
        this.smModal.hide();
      });
  }

  public updateUser(firstName: string, country: string, lastName: string, city: string): void {
    this.userUpdateSuccess = false;
    let userData = {
      email: this.user.email,
      userUpdateSet: {
        firstName: typeof firstName === 'undefined' ? this.user.firstName : firstName,
        country: typeof country === 'undefined' ? this.user.country : country,
        lastName: typeof lastName === 'undefined' ? this.user.lastName : lastName,
        city: typeof city === 'undefined' ? this.user.city : city
      }
    };

    this.editProfileServiceSubscribe = this.editProfileService.editUser(userData)
      .subscribe((res): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }

        this.userUpdateSuccess = !res.error;

        this.user.firstName = userData.userUpdateSet.firstName;
        this.user.lastName = userData.userUpdateSet.lastName;
        this.user.country = userData.userUpdateSet.country;
        this.user.city = userData.userUpdateSet.city;
      });
  }

  public updateUserAdditional(userWebsite: string, groupName: string, username: string): void {
    this.userUpdateSuccess = false;
    let userData = {
      email: this.user.email,
      userUpdateSet: {
        gender: this.user.gender,
        position: this.user.position,
        website: typeof userWebsite === 'undefined' ? this.user.website : userWebsite,
        groupName: typeof groupName === 'undefined' ? this.user.groupName : groupName,
        username: typeof username === 'undefined' ? this.user.username : username
      }
    };

    this.editProfileAdditionalServiceSubscribe = this.editProfileService.editUser(userData)
      .subscribe((res): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }

        this.userUpdateSuccess = !res.error;

        this.user.website = userData.userUpdateSet.website;
        this.user.groupName = userData.userUpdateSet.groupName;
        this.user.username = userData.userUpdateSet.username;
      });
  }

  public updateUserContacts(userPhone: string, userSkype: string, userHangouts: string): void {
    this.userUpdateSuccess = false;
    let userData = {
      email: this.user.email,
      userUpdateSet: {
        contacts: {
          phone: typeof userPhone === 'undefined' ? this.user.contacts.phone : userPhone,
          skype: typeof userSkype === 'undefined' ? this.user.contacts.skype : userSkype,
          hangouts: typeof userHangouts === 'undefined' ? this.user.contacts.hangouts : userHangouts
        }
      }
    };

    this.editProfileAdditionalServiceSubscribe = this.editProfileService.editUser(userData)
      .subscribe((res): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }

        this.userUpdateSuccess = !res.error;

        this.user.contacts.phone = userData.userUpdateSet.contacts.phone;
        this.user.contacts.skype = userData.userUpdateSet.contacts.skype;
        this.user.contacts.hangouts = userData.userUpdateSet.contacts.hangouts;
      });
  }

  public updateUserBiography(biographyUpd: string): void {
    this.userUpdateSuccess = false;
    let userData = {
      email: this.user.email,
      userUpdateSet: {
        biography: typeof biographyUpd === 'undefined' ? this.user.biography : biographyUpd
      }
    };

    this.editProfileAdditionalServiceSubscribe = this.editProfileService.editUser(userData)
      .subscribe((res): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }

        this.userUpdateSuccess = !res.error;

        this.user.biography = userData.userUpdateSet.biography;
      });
  }

  public getUser(email: string): void {
    this.getProfileServiceSubscribe = this.editProfileService.getUser(email)
      .subscribe((res): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }

        this.user = res.data;
      });
  }
}
