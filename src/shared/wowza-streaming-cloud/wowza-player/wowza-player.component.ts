import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { WowzaCloudService } from '../wowza-cloud.service';

@Component({
  selector: 'app-wowza-player',
  templateUrl: 'wowza-player.component.html',
  styleUrls: ['wowza-player.component.css']
})
export class WowzaPlayerComponent {
  @Input()
  set showData(showParams: any) {
    if (!showParams) {
      return;
    }

    this.playerTemplateId = `wowza-player-${showParams.wowza.id}`;
    this.showParams = showParams;

    Promise.resolve(null)
      .then(() => {
        this.initPlayer();
      });

  }

  showParams: any;
  player: any;
  playerTemplateId = 'wowza-player';

  constructor(private wowzaCloudService: WowzaCloudService) {

  }

  initPlayer(): void {
    this.player = this.wowzaCloudService.initPlayer(this.parsePlayerConfig(), this.playerTemplateId);
  }

  parsePlayerConfig(): any {
    return {
      title: this.showParams.showName,
      description: this.showParams.description,
      sourceURL: this.showParams.wowza.player_hls_playback_url,
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
