import { Injectable } from '@angular/core';

@Injectable()
export class WowzaCloudConfig {
  static API_KEY = 'iMWBjGoU485F6QkxR11J0r72Lde6HzB8czPL8yF8n0Qz7FOVHsBkKzUvV975300b'; // sandbox
  static ACCESS_KEY = 'bj2NPaMNc7Bd73Dg33s9wcNhcKrooUAIToMcmkdW5UgVyIggSGe9wrB6mDOY334f'; // sandbox
  static API_URL = 'https://api-sandbox.cloud.wowza.com/api/v1/'; // sandbox
  static PLAYER_LICENCE = 'PLAY1-mMeyz-dkzAc-XEaku-PVK94-pUAye'; // sandbox
  // static API_KEY = ''; // we donn't have, yet.  Not available in trial version
  // static ACCESS_KEY = ''; // we donn't have, yet. Not available in trial version
  // static API_URL = 'https://api.cloud.wowza.com/api/v1/live_streams/';
  // static PLAYER_LICENCE = ''; // should get after registration. http://player.wowza.com/en/builder
}
