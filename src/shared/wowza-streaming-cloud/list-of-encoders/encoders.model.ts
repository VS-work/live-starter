import { Device, Encoder } from './encoders.interface';

export const devices: Device[] = [
  {
    title: 'Mobile Phone',
    type: 'mobile',
    isBetaSupport: false
  },
  {
    title: 'Tablet',
    type: 'mobile',
    isBetaSupport: false
  },
  {
    title: 'Webcamera',
    type: 'webcamera',
    isBetaSupport: false
  },
  {
    title: 'IP camera',
    type: 'ip_camera',
    isBetaSupport: true
  },
  {
    title: 'Other',
    type: 'need_device',
    isBetaSupport: true
  }
];

export const encoders: Encoder[] = [
  {
    title: 'Wowza GoCoder™',
    value: 'wowza_gocoder',
    type: 'mobile'
  },
  {
    title: 'Axis',
    value: 'axis',
    type: 'ip_camera'
  },
  {
    title: 'Epiphan',
    value: 'epiphan',
    type: 'need_device'
  },
  {
    title: 'Hauppauge',
    value: 'hauppauge',
    type: 'need_device'
  },
  {
    title: 'JVC',
    value: 'jvc',
    type: 'camera_encoder'
  },
  {
    title: 'LiveU Solo',
    value: 'live_u',
    type: 'need_device'
  },
  {
    title: 'Matrox',
    value: 'matrox',
    type: 'need_device'
  },
  {
    title: 'NewTek TriCaster',
    value: 'newtek_tricaster',
    type: 'need_device'
  },
  {
    title: 'Osprey Talon',
    value: 'osprey',
    type: 'need_device'
  },
  {
    title: 'Sony',
    value: 'sony',
    type: 'camera_encoder'
  },
  {
    title: 'Telestream Wirecast',
    value: 'telestream_wirecast',
    type: 'webcamera'
  },
  {
    title: 'Tradek Cube',
    value: 'teradek_cube',
    type: 'need_device'
  },
  {
    title: 'vMix',
    value: 'vmix',
    type: 'webcamera'
  },
  {
    title: 'XSplit',
    value: 'x_split',
    type: 'webcamera'
  },
  {
    title: 'IP Camera',
    value: 'ipcamera',
    type: 'ip_camera'
  },
  {
    title: 'OBS Studio',
    value: 'other_rtmp',
    type: 'webcamera'
  },
  {
    title: 'Other RTSP',
    value: 'other_rtsp',
    type: 'need_device'
  }
];
