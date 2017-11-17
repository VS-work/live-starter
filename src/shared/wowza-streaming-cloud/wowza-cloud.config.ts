import { Injectable } from '@angular/core';

@Injectable()
export class WowzaCloudConfig {
  static API_KEY = 'Y9bYSY9Qr69GOQAQKrZQrcMXI6scfcLrH3qWtIHUZMWhF7MQ3NNO3NjxtUQC320f'; // sandbox
  static ACCESS_KEY = 'rne1uqBXNfGSIyDCF9oQ7RxrgW5uLu4zdn0bT3vEr6XhczpXaSOk0IoCceOZ351f'; // sandbox
  static API_URL = 'https://api-sandbox.cloud.wowza.com/api/v1/'; // sandbox
  static PLAYER_LICENCE = 'PLAY1-6wkpy-4jeGF-DJadK-QrQ43-vxkNQ'; // should get after registration. http://player.wowza.com/en/builder
  // static API_KEY = ''; // we donn't have, yet.  Not available in trial version
  // static ACCESS_KEY = ''; // we donn't have, yet. Not available in trial version
  // static API_URL = 'https://api.cloud.wowza.com/api/v1/live_streams/';
  // static PLAYER_LICENCE = ''; // should get after registration. http://player.wowza.com/en/builder
}
