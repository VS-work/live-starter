import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { WowzaCloudService } from '../wowza-cloud.service';
import { LaunchEvent } from '../../../event-launch/event-launch.interface';
import { PlayerConfig } from './player-config.interface';

@Component({
  selector: 'app-wowza-player',
  templateUrl: 'wowza-player.component.html',
  styleUrls: ['wowza-player.component.css']
})
export class WowzaPlayerComponent {
  @Input()
  set showData(showParams: LaunchEvent) {
    if (!showParams) {
      return;
    }

    this.playerTemplateId = `wowza-player-${showParams.wowza.id}`;
    this._showParams = showParams;

    Promise.resolve(null)
      .then(() => {
        this.initPlayer();
      });

  }

  private _showParams: LaunchEvent;
  player: any;
  playerTemplateId = 'wowza-player';

  constructor(private wowzaCloudService: WowzaCloudService) {

  }

  initPlayer(): void {
    this.player = this.wowzaCloudService.initPlayer(this.parsePlayerConfig(), this.playerTemplateId);
  }

  parsePlayerConfig(): PlayerConfig {
    return {
      title: this._showParams.showName,
      description: this._showParams.description,
      sourceURL: this._showParams.wowza.player_hls_playback_url,
      autoPlay: false,
      volume: 20,
      mute: false,
      loop: false,
      audioOnly: false,
      uiShowQuickRewind: true,
      posterFrameURL: null,
      endPosterFrameURL: null,
      uiPosterFrameFillMode: 'fill',
      uiQuickRewindSeconds: 30
    }
  }
}
