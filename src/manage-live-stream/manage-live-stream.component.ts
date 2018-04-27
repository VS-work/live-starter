import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Show, ShowManagementService } from '../shared/services/show-management-service';
import { WowzaCloudService } from '../shared/wowza-streaming-cloud/wowza-cloud.service';

@Component({
  selector: 'app-manage-live-stream',
  templateUrl: './manage-live-stream.component.html',
  styleUrls: ['./manage-live-stream.component.scss']
})
export class ManageLiveStreamComponent implements OnInit, OnDestroy {
  subscriptionManager: Subscription = new Subscription();
  currentShow: Show;
  isStartedStream = false;
  liveStreamId: string;
  isEditEncoder = false;
  isShowPassword = false;

  constructor(private route: ActivatedRoute,
              private showManagementService: ShowManagementService,
              private wowzaCloudService: WowzaCloudService) {
  }

  ngOnInit() {
    const routerQueryParamsSubscription = this.route.queryParams
      .subscribe(params => {
        this.getCurrentShow({findById: params.id});
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(routerQueryParamsSubscription);
  }

  getCurrentShow(rawQuery: {[key: string]: any}): void {
    const getCurrentShowSubcribtion = this.showManagementService.getEventForManage(rawQuery)
      .subscribe(res => {
        this.currentShow = res;
        this.liveStreamId = res.wowza.id;

        this.getLiveStreamFromWowza();
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(getCurrentShowSubcribtion);
  }

  getLiveStreamFromWowza(): void {
    if (!this.currentShow || !this.liveStreamId) {
      return undefined;
    }

    const getLiveStreamSubscription = this.wowzaCloudService.getLiveStream(this.liveStreamId)
      .subscribe(stream => {
        this.currentShow.wowza = stream;
      }, err => {
        console.error('something went wrong: ', err);
      });

    const getLiveStreamStateSubscription = this.wowzaCloudService.getLiveStreamState(this.liveStreamId)
      .subscribe(res => {
        this.isStartedStream = res.state === 'started' || res.state === 'starting';
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(getLiveStreamSubscription);
    this.subscriptionManager.add(getLiveStreamStateSubscription);
  }

  startLiveStream(): void | undefined {
    if (!this.currentShow || !this.liveStreamId || this.isStartedStream) {
      return undefined;
    }

    const startLiveStreamSubscription = this.wowzaCloudService.startLiveStream(this.liveStreamId)
      .subscribe(() => {
        this.isStartedStream = true;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(startLiveStreamSubscription);
  }

  stopLiveStream(): void | undefined {
    if (!this.currentShow || !this.liveStreamId || !this.isStartedStream) {
      return undefined;
    }

    const stopLiveStreamSubscription = this.wowzaCloudService.stopLiveStream(this.liveStreamId).subscribe(() => {
      this.isStartedStream = false;
    }, err => {
      console.error('something went wrong: ', err);
    });

    this.subscriptionManager.add(stopLiveStreamSubscription);
  }

  deleteLiveStream(): void | undefined {
    if (!this.currentShow || !this.liveStreamId) {
      return undefined;
    }

    const deleteLiveStreamSubscription = this.wowzaCloudService.deleteLiveStream(this.liveStreamId).subscribe(() => {
      this.isStartedStream = false;
      this.liveStreamId = null;
      this.currentShow.wowza = null;
    }, err => {
      console.error('something went wrong: ', err);
    });

    this.subscriptionManager.add(deleteLiveStreamSubscription);
  }

  regenerateConnectionCode(): void | undefined {
    if (!this.currentShow || !this.liveStreamId || !this.currentShow.wowza.connection_code) {
      return undefined;
    }

    const startLiveStreamSubscription = this.wowzaCloudService.regenerateConnectionCode(this.liveStreamId)
      .subscribe(res => {
        this.currentShow.wowza.connection_code = res.connection_code;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(startLiveStreamSubscription);
  }

  changeEncoder(encoder: string): void | undefined {
    if (!this.currentShow || !this.liveStreamId) {
      return undefined;
    }

    if (this.currentShow.wowza.encoder === encoder) {
      this.isEditEncoder = false;
      return undefined;
    }

    const updateLiveStreamSubscription = this.wowzaCloudService.updateLiveStream(this.liveStreamId, {encoder})
      .subscribe(res => {
        this.currentShow.wowza.encoder = res.encoder;
        this.isEditEncoder = false;
      }, err => {
        console.error('something went wrong: ', err);
      });

    this.subscriptionManager.add(updateLiveStreamSubscription);
  }

  editEncoder(): void {
    this.isEditEncoder = !this.isEditEncoder;
  }

  cancelEditEncoder(): void {
    this.isEditEncoder = false;
  }

  showHidePassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  ngOnDestroy() {
    this.subscriptionManager.unsubscribe();
  }
}
