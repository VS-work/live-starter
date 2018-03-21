export class NewStreamModel {
  aspect_ratio_height = 1080;
  aspect_ratio_width = 1920;
  broadcast_location = 'eu_germany';
  delivery_method = 'push';
  encoder = 'wowza_gocoder';
  low_latency = true;
  name = 'My Live Stream4';
  player_responsive = true;
  player_type = 'wowza_player';
  player_video_poster_image = '';
  disable_authentication = false;
}

export interface LiveStreamStatus {
  state: string
}

export interface LiveStreamConnectionCode {
  connection_code: string
}

export interface WowzaResponse {
  aspect_ratio_height?: number;
  aspect_ratio_width?: number;
  billing_mode?: string;
  broadcast_location?: string;
  closed_caption_type?: string;
  connection_code?: string;
  connection_code_expires_at?: string;
  created_at?: string;
  delivery_method?: string;
  delivery_protocols?: string[];
  delivery_type?: string,
  direct_playback_urls?: { [key: string]: any }[];
  encoder?: string;
  hosted_page?: boolean;
  hosted_page_description?: string;
  hosted_page_logo_image_url?: string;
  hosted_page_sharing_icons?: boolean;
  hosted_page_title?: string;
  hosted_page_url?: string;
  id: string | null;
  name?: string;
  player_countdown?: boolean;
  player_countdown_at?: string;
  player_embed_code?: string,
  player_hds_playback_url?: string;
  player_hls_playback_url?: string;
  player_id?: string;
  player_logo_image_url?: string;
  player_logo_position?: string;
  player_responsive?: boolean
  player_type?: string;
  player_video_poster_image_url?: string;
  player_width?: number;
  recording?: boolean;
  source_connection_information?: {
    username: string;
    password: string;
    disable_authentication: boolean;
    [key: string]: any;
  };
  stream_source_id?: string;
  stream_targets?: { [key: string]: any }[];
  target_delivery_protocol?: string;
  transcoder_type?: string;
  updated_at?: string;
  use_stream_source?: boolean;
  video_fallback?: boolean;
}
