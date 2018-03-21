import { Component, Input } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { PlayerConfig } from './player-config.interface';
import { Show } from '../../show-service/show.model';
import { WowzaPlayerService } from './wowza-player.service';

@Component({
  selector: 'app-wowza-player',
  templateUrl: './wowza-player.component.html',
  styleUrls: ['./wowza-player.component.css']
})
export class WowzaPlayerComponent {
  @Input()
  set showData(showParams: Show) {
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

  showParams: Show = null;
  player: any = null;
  playerTemplateId = 'wowza-player';

  constructor(private wowzaPlayerService: WowzaPlayerService,
              private router: Router) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationStart) || ! this.player) {
        return;
      }

      this.player.destroy(this.playerTemplateId);
    });
  }

  initPlayer(): void {
    this.player = this.wowzaPlayerService.initPlayer(this.parsePlayerConfig(), this.playerTemplateId);
  }

  parsePlayerConfig(): PlayerConfig {
    return {
      title: this.showParams.name,
      description: this.showParams.description,
      // sourceURL: this.showParams.wowza.player_hls_playback_url, // should be uncommented when we have Wowza licence
      sourceURL: 'https://fe159f.entrypoint.cloud.wowza.com/app-77cf/ngrp:cfb45107_all/playlist.m3u8',
      // should be deleted when we have Wowza licence
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
