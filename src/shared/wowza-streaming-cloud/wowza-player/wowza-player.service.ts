import { Injectable } from '@angular/core';

import { WowzaCloudConfig } from '../wowza-cloud.config';

declare let WowzaPlayer: any;

@Injectable()
export class WowzaPlayerService {
  initPlayer(stream: any, cssSelector: string): any {
    return WowzaPlayer.create(cssSelector, {
      ...{license: WowzaCloudConfig.PLAYER_LICENCE},
      ...stream
    });
  }

}
