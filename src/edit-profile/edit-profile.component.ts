import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EditProfileService } from './edit-profile.service';
import { LocalStorageService } from '../auth/localStorage.service';

@Component({
  selector: 'app-edit-profile-component',

  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  public editProfileService: EditProfileService;
  public editProfileServiceSubscribe: Subscription;
  public getProfileServiceSubscribe: Subscription;
  public userProfileService: LocalStorageService;
  public checkModel: any;
  public user: any;
  public localStorageUserProfile: any;

  public constructor(editProfileService: EditProfileService,
                     userProfileService: LocalStorageService) {
    this.editProfileService = editProfileService;
    this.userProfileService = userProfileService;
  }

  public ngOnInit(): void {
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
      this.getProfileServiceSubscribe = this.editProfileService.getUser(this.localStorageUserProfile.email)
        .subscribe((res): void => {
          if (res.err) {
            console.error(res.err);
            return;
          }

          this.user = res.data;
        });
    }
  }

  public updateUser(firstName: string, country: string, lastName: string, city: string): void {
    let userData = {
      email: this.user.email,
      firstName: firstName || this.user.firstName,
      country: country || this.user.country,
      lastName: lastName || this.user.lastName,
      city: city || this.user.city
    };

    this.editProfileServiceSubscribe = this.editProfileService.editUser(userData)
      .subscribe((res): void => {

        if (res.err) {
          console.error(res.err);
          return;
        }

        this.user.firstName = userData.firstName || this.user.firstName;
        this.user.lastName = userData.lastName || this.user.lastName;
        this.user.country = userData.country || this.user.country;
        this.user.city = userData.city || this.user.city;
      });
  }
}
