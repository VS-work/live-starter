import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { WowzaCloudService } from './wowza-cloud.service';

@Component({
  selector: 'app-wowza-cloud',
  templateUrl: 'wowza-cloud.component.html'
})
export class WowzaCloudComponent implements OnDestroy {
  @Input()
  set currentShow(params: any) {
    if (!params) {
      return;
    }

    const streamSubscription = this.wowzaCloudService.getStream(params.wowza.id)
      .subscribe(stream => {
        this.showData = {
          ...params,
          wowza: {
            ...stream,
            ...{player_hls_playback_url: 'https://10e8f0.entrypoint.cloud.wowza.com/app-8de5/ngrp:03bae8e8_all/playlist.m3u8'}
          }
        };

        const streamStateSubsciption = this.wowzaCloudService.getStreamState(this.showData.wowza.id)
          .subscribe((state: string) => {
            console.log('state', state);
            this.isStartedStream = state === 'started' || state === 'starting';
          }, err => {
            console.log('err: ', JSON.parse(err._body));
          });

        this.subManager.add(streamStateSubsciption);

        console.log('showData', this.showData.wowza);
      }, err => {
        console.log('err: ', JSON.parse(err._body));
      });

    this.subManager.add(streamSubscription);
  };

  showData: any;
  isStartedStream = false;
  subManager = new Subscription();

  constructor(private wowzaCloudService: WowzaCloudService) {

  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }

  startStream() {
    if (!this.isStartedStream) {
      const startSubscription = this.wowzaCloudService.startStream(this.showData.wowza.id)
        .subscribe((res: any) => {
          this.isStartedStream = true;
        }, (err: any) => {
          console.log('err start stream', err);
        });

      this.subManager.add(startSubscription);
    }
  }

  regenerateConnectionCode() {
    const codeSubscription = this.wowzaCloudService.regenerateConnectionCode(this.showData.wowza.id)
      .subscribe((res: any) => {
        this.showData.wowza.connection_code = res;
      }, (err: any) => {
        console.log('err start stream', err);
      });

    this.subManager.add(codeSubscription);
  }

  stopStream() {
    if (!this.isStartedStream) {
      return;
    }

    const stopSubscription = this.wowzaCloudService.stopStream(this.showData.wowza.id)
      .subscribe((res: any) => {
        console.log('stream stopped', res);
        this.isStartedStream = false;
      }, (err: any) => {
        console.log('err stop stream', err);
      });

    this.subManager.add(stopSubscription);

  }

  changeEncoder(encoder: string) {
    const codeSubscription = this.wowzaCloudService.updateStream(this.showData.wowza.id, {encoder})
      .subscribe((res: any) => {
        this.showData.wowza = {
          ...res,
          ...{
            player_hls_playback_url: 'https://10e8f0.entrypoint.cloud.wowza.com/app-8de5/ngrp:03bae8e8_all/playlist.m3u8'}
            // should be deleted after by wowza licence
        };
      }, (err: any) => {
        console.log('err start stream', err);
      });

    this.subManager.add(codeSubscription);
  }

  newStream() {
    const newStreamSubscription = this.wowzaCloudService.newStream('')
      .subscribe((res: any) => {
        console.log('New stream', res);
      }, (err: any) => {
        console.log('err start stream', err);
      });

    this.subManager.add(newStreamSubscription);
  }
}

