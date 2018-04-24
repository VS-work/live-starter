import { Component, OnInit } from '@angular/core';

import { HowItWorksService } from './how-it-works.service';
import { CustomTabs, TAB_FOR_ARTIST, TAB_FOR_FAN } from './custom-tabs.interface';
import { HowItWorksInfo } from './how-it-works-info.interface';

@Component({
  selector: 'app-how-it-works-component',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})

export class HowItWorksComponent implements OnInit {
  activeCustomTab: CustomTabs = TAB_FOR_ARTIST;
  pageInfo: HowItWorksInfo;
  forArtistsInfo: HowItWorksInfo;
  forFansInfo: HowItWorksInfo;
  tabs: CustomTabs[] = [TAB_FOR_ARTIST, TAB_FOR_FAN];

  constructor(private howItWorksService: HowItWorksService) {

  }

  ngOnInit() {
    this.getInfoForArtist();
  }

  changeTab(): void {
    if (this.activeCustomTab === TAB_FOR_ARTIST) {
      if (this.forArtistsInfo) {
        this.pageInfo = this.forArtistsInfo;

        return;
      }

      this.getInfoForArtist();

      return;
    }

    if (this.forFansInfo) {
      this.pageInfo = this.forFansInfo;

      return;
    }

    this.getInfoForFans();

  }

  getInfoForArtist(): void {
    const pageInfoForArtistSubscribton = this.howItWorksService.getInfoForArtists();
    pageInfoForArtistSubscribton
      .filter(data => !!data.notes && !!data.benefits)
      .subscribe(res => {
        this.pageInfo = res;
        this.forArtistsInfo = res;
      }, err => {
        console.error('something went wrong: ', err);
      })
  }

  getInfoForFans(): void {
    const pageInfoForArtistSubscribton = this.howItWorksService.getInfoForFans();
    pageInfoForArtistSubscribton
      .filter(data => !!data.notes && !!data.benefits)
      .subscribe(res => {
        this.pageInfo = res;
        this.forFansInfo = res;
      })
  }
}
