import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { head } from 'lodash';

import { SearchService, LocalStorageService } from '../shared';
import { Config } from '../app.config';
import { LaunchEvent } from '../event-launch/event-launch.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { EventInfo } from '../shared/event-info/event-info.interface';
import { Show } from '../event-launch/event-launch.model';

@Component({
  selector: 'app-show-page-component',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.scss']
})

export class ShowPageComponent implements OnInit, OnDestroy {
  getEventsDataSubcribe: Subscription;
  getCurrentShowSubcribe: Subscription;
  checkModel: boolean;
  donates: number[];
  donationPeriodList: string[];
  currentShow: Show;
  donation: number;
  donationPeriod: string;
  audios: SafeHtml = [];
  videos: SafeHtml = [];
  eventsData: Show[];
  eventInfo: EventInfo;

  constructor( private router: Router,
               private searchService: SearchService,
               private localStorageService: LocalStorageService,
               private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.checkModel = true;
    this.donation = 2;
    this.donationPeriod = 'month';
    this.donates = [2, 5, 7, 10, 15, 20, 30, 50];
    this.donationPeriodList = ['year', 'month', 'week', 'day'];

    try {
      const getCurrentShowFromLocalStorage = JSON.parse(this.localStorageService.getItem('currentShow'));
      this.getCurrentShow(getCurrentShowFromLocalStorage);
      this.getSimilarEvents(getCurrentShowFromLocalStorage);
    } catch (err) {
      console.error('something went wrong: ', err);
    }
  }

  getCurrentShow(rawQuery: {[key: string]: any}): void {
    const query: string = Config.objToQuery(rawQuery);

    this.getCurrentShowSubcribe = this.searchService.getEventsList(query)
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.currentShow = new Show(head(res.data));
        this.eventInfo = {
          showLocation: this.currentShow.location.country,
          artistId: this.currentShow.creator,
          showGenres: this.currentShow.genres,
          tickets: this.currentShow.tickets
        };
        this.audios = this.parseEmbeddingfiles(this.currentShow.audios);
        this.videos = this.parseEmbeddingfiles(this.currentShow.videos);
        this.currentShow.wowza = {
          id: 'bshjwppf',
          player_hls_playback_url: 'https://10e8f0.entrypoint.cloud.wowza.com/app-8de5/ngrp:03bae8e8_all/playlist.m3u8'
        }; // should be delete

        console.log(this.currentShow);
      });
  }

  getSimilarEvents(rawQuery: {[key: string]: any}): void {
    const query: string = Config.objToQuery({
      exceptByName: rawQuery.findByName,
      exceptByCreator: rawQuery.findByCreator
    });

    this.getEventsDataSubcribe = this.searchService.getEventsList(query)
      .subscribe((res: any): void => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        this.eventsData = res.data.map((show: LaunchEvent) => new Show(show));
      });
  }

  pushDonateNumber(donateNumberPush: number): void {
    this.donation = donateNumberPush;
  }

  pushDonatePeriod(donatePeriodPush: string): void {
    this.donationPeriod = donatePeriodPush;
  }

  parseEmbeddingfiles(embeddingFiles: string[], isVideo = false): SafeHtml[] {
    return embeddingFiles.map(embeddingFile => {
      const file = !isVideo ? embeddingFile
        : embeddingFile.replace('<iframe', '<iframe class="embed-responsive-item"');
      return this.domSanitizer.bypassSecurityTrustHtml(file);
    });
  }

  getImgUrl(fileName: string): string {
    return `${Config.api}/uploads/posters/${fileName}`;
  }

  ngOnDestroy() {
    this.getEventsDataSubcribe.unsubscribe();
    this.getCurrentShowSubcribe.unsubscribe();
  }
}
