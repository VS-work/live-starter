import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ArtistProfileService } from './artist-profile.service';

@Component({
  selector: 'app-artist-profile-component',

  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})

export class ArtistProfileComponent implements OnInit {
  public artistProfileService: ArtistProfileService;
  public artistProfileServiceSubscribe: Subscription;
  public radioModel: string;
  public user: any;

  public constructor(artistProfileService: ArtistProfileService) {
    this.artistProfileService = artistProfileService;
  }

  public ngOnInit(): void {
    this.radioModel = 'permonth';
    this.artistProfileServiceSubscribe = this.artistProfileService.getUser()
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        const user: any[] = res.data;
        this.user = user;
      });
  }
}
