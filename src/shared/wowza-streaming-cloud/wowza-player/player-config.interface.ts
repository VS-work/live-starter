export interface PlayerConfig {
  title: string,
  description: string,
  sourceURL: string,
  autoPlay: boolean,
  volume: number,
  mute: boolean,
  loop: boolean,
  audioOnly: boolean,
  uiShowQuickRewind: boolean,
  posterFrameURL: string,
  endPosterFrameURL: string,
  uiPosterFrameFillMode: string,
  uiQuickRewindSeconds: number
};
