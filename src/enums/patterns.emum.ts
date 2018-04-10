export enum Pattern {
  Email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$',
  YoutubeOrVimeoUrl =
    '^(http:\\/\\/|https:\\/\\/)(vimeo\\.com|youtu\\.be|www\\.youtube\\.com)\\/(([\\w\\/]+)(-{0,})([\\w\\/]+)){0,}([\\?].*)?$',
  SoundCloudUrl = '^(https?:\\/\\/)?(www.)?(m\\.)?soundcloud\\.com\\/(([\\w\\/]+)(-{0,})([\\w\\/]+)){0,}([\\?].*)?$',
}
