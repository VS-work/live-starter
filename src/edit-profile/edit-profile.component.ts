import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { EditProfileService } from './edit-profile.service';
import { LocalStorageService, SearchService } from '../shared';
import { User, USER_TYPES, UserType } from '../shared/services/user-service';
import { MultipleGenres } from '../event-launch/multipleGenres.interface';
import { LocationService } from '../shared/services';
import { Country } from '../shared/models';

interface UpdatiingUserData {
  email: string;
  userUpdateSet: {
    website: string;
    username?: string;
    gender?: string;
    groupName?: string;
    genres?: string[];
  }
}

@Component({
  selector: 'app-edit-profile-component',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
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
  public localStorageUserProfile: any;
  public countries: Country[];
  public positions: any[];
  public userUpdateSuccess: boolean;
  user: User = null;
  genres: MultipleGenres[];
  genders: string[] = ['Male', 'Female', 'Other'];

  userTypes: UserType[] = USER_TYPES;

  @ViewChild('smModal') public smModal: ModalDirective;

  public constructor(editProfileService: EditProfileService,
                     userProfileService: LocalStorageService,
                     searchService: SearchService,
                     private locationService: LocationService) {
    this.editProfileService = editProfileService;
    this.userProfileService = userProfileService;
    this.searchService = searchService;
  }

  public ngOnInit(): void {
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

    this.getLocationsSubscribe = this.locationService.getCountries()
      .subscribe(res => {
        this.countries = res;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.getGenresSubscribe = this.searchService.getMusicStyles()
      .subscribe(res => {
        this.genres = this.genres = res.map((genre: string) => ({isChecked: false, value: genre}));
      }, err => {
        console.error('something went wrong: ', err);
      });
  }

  public changeAvatarLink(newLink: string): void {
    const newAvatarLink: any = {newAvatarLink: newLink, email: this.user.email};

    this.editProfileAvatarServiceSubscribe = this.editProfileService.editUserAvatar(newAvatarLink)
      .subscribe(res => {
              this.getUser(this.localStorageUserProfile.email);
        this.smModal.hide();
      }, err => {
        console.error('something went wrong: ', err);
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
      .subscribe(res => {
        this.userUpdateSuccess = true;

        this.user.firstName = userData.userUpdateSet.firstName;
        this.user.lastName = userData.userUpdateSet.lastName;
        this.user.country = userData.userUpdateSet.country;
        this.user.city = userData.userUpdateSet.city;
      }, err => {
        this.userUpdateSuccess = false;
        console.error('something went wrong: ', err);
      });
  }

  public updateUserAdditional(): void {
    this.userUpdateSuccess = false;
    let userData: UpdatiingUserData = {
      email: this.user.email,
      userUpdateSet: {
        website: this.user.website
      }
    };

    if (this.user.type === 'fan') {
      userData.userUpdateSet.username = this.user.username;
      userData.userUpdateSet.gender = this.user.gender;
    }

    if (this.user.type === 'artist') {
      userData.userUpdateSet.groupName = this.user.groupName;
      userData.userUpdateSet.genres = this.user.genres;
    }

    this.editProfileAdditionalServiceSubscribe = this.editProfileService.editUser(userData)
      .subscribe(res => {
        this.userUpdateSuccess = true;

        this.user.website = userData.userUpdateSet.website;
        this.user.groupName = userData.userUpdateSet.groupName;
        this.user.username = userData.userUpdateSet.username;
      }, err => {
        this.userUpdateSuccess = false;
        console.error('something went wrong: ', err);
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
      .subscribe(res => {
        this.userUpdateSuccess = true;

        this.user.contacts.phone = userData.userUpdateSet.contacts.phone;
        this.user.contacts.skype = userData.userUpdateSet.contacts.skype;
        this.user.contacts.hangouts = userData.userUpdateSet.contacts.hangouts;
      }, err => {
        this.userUpdateSuccess = false;
        console.error('something went wrong: ', err);
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
      .subscribe(res => {
        this.userUpdateSuccess = true;

        this.user.biography = userData.userUpdateSet.biography;
      }, err => {
        this.userUpdateSuccess = false;
        console.error('something went wrong: ', err);
      });
  }

  getUser(email: string): void {
    this.getProfileServiceSubscribe = this.editProfileService.getUser(email)
      .subscribe(res => {
        this.user = new User(res);
        this.parseGenres();
      }, err => {
        console.error('something went wrong: ', err);
      });
  }

  parseGenres(): void {
    this.genres = this.genres.map((genre: MultipleGenres) => {
      const ischecked = this.user.genres.indexOf(genre.value) !== -1;

      return {isChecked: ischecked, value: genre.value}
    })
  }

  changeUserType(type: string): void {
    this.user.type = type;
  }

  chooseGenre(): void {
    this.user.genres = this.genres
      .filter(genre => genre.isChecked)
      .map(genre => genre.value);
  }
}
