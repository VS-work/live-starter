import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { Subscription } from 'rxjs/Subscription';

import head from 'lodash-es/head';

import { SearchService, LocalStorageService } from '../shared';
import { Config } from '../app.config';
import { EventInfo } from '../shared/event-info/event-info.interface';
import { PurchaseParamsModel } from '../shared/purchase-container/purchase-container.model';
import { UserService } from '../user-service/user.service';
import { User } from '../user-service/user.model';
import { LinkWithEmbedCode, Show } from '../shared/show-service/show.model';
import { ShowService } from '../shared/show-service/show.service';
import { StatisticsItem } from '../shared/statistics/statistics.interface';
import { STATISTICS_LIKES, STATISTICS_FOLLOWERS } from '../shared/statistics/statistics-types.model';

@Component({
  selector: 'app-show-page-component',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.scss']
})

export class ShowPageComponent implements OnInit, OnDestroy {
  subscriptionManager: Subscription = new Subscription();
  currentShow: Show;
  audios: SafeHtml = [];
  videos: SafeHtml = [];
  eventInfo: EventInfo;
  similarEvents: Show[] = [];
  purchaseParams: PurchaseParamsModel;
  currentUser: User = null;
  isRemindMe = false;
  statistics: StatisticsItem[] = [];

  constructor( private router: Router,
               private searchService: SearchService,
               private localStorageService: LocalStorageService,
               private domSanitizer: DomSanitizer,
               private userService: UserService,
               private showService: ShowService,
               private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.currentUser = this.userService.getUserFromLocalStorage();
        this.getCurrentShow({findById: params.id});
      });
  }

  getCurrentShow(rawQuery: {findById: string}): void {
    const getCurrentShowSubcribe = this.showService.getEventsListByQuery(rawQuery)
      .subscribe(res => {
        this.currentShow = head(res);
        this.getSimilarEvents();
        this.eventInfo = {
          artistId: this.currentShow.creator,
          showHashtags: this.currentShow.hashtags,
          tickets: this.currentShow.tickets
        };
        this.statistics = [
          {...STATISTICS_LIKES, ...{value: this.currentShow.statistics.likes}},
          {...STATISTICS_FOLLOWERS, ...{value: this.currentShow.statistics.followers}}
        ];

        this.audios = this.parseEmbeddingfiles(this.currentShow.audios);
        this.videos = this.parseEmbeddingfiles(this.currentShow.videos);
        this.currentShow.wowza = {
          id: 'bshjwppf',
          player_hls_playback_url: 'https://10e8f0.entrypoint.cloud.wowza.com/app-8de5/ngrp:03bae8e8_all/playlist.m3u8'
        }; // should be delete in the future

        this.purchaseParams = new PurchaseParamsModel(this.currentShow._id, this.currentUser ? this.currentUser._id : null);
      }, err => {
        this.purchaseParams = null;
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(getCurrentShowSubcribe);
  }

  getSimilarEvents(): void |undefined {
    if (!this.currentShow.hashtags.length) {
      return undefined;
    }

    const minDate = new Date();
    minDate.setHours(0, 0, 0);

    const query = {
      hashtags: this.currentShow.hashtags,
      limit: 10,
      minDate,
      exceptById: this.currentShow._id
    };

    const getEventsDataSubcribe = this.showService.getEventsListByQuery(query)
      .subscribe(res => {
        this.similarEvents = res;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(getEventsDataSubcribe)
  }

  parseEmbeddingfiles(embeddingFiles: LinkWithEmbedCode[], isVideo = false): SafeHtml[] {
    return embeddingFiles.map(embeddingFile => this.domSanitizer.bypassSecurityTrustHtml(embeddingFile.embedCode));
  }

  getImgUrl(fileName: string): string {
    const file = fileName && fileName.length ? fileName : 'default_show_img.jpg';
    return `${Config.api}/uploads/posters/${file}`;
  }

  setShowIsBought(isBought: boolean): void {
    this.currentShow.isBought = isBought;
  }

  remindMe(): void {
    // should be functionality for reminding user about this event
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }
}
