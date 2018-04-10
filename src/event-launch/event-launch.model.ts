import * as moment from 'moment';

import { LaunchEvent } from './event-launch.interface';
import { LinkWithEmbedCode } from '../shared/show-service/show.model';

const defaulttickets = {
  count: 0,
  ticketPrice: 0,
  ticketsToFund: 0,
  ticketsSold: 0,
  fundedPercentage: 0,
};

const defaultStatistics = {
  likes: 0,
  viewers: 0,
  followers: 0
};

const defaultTimePerformance = {
  start: moment(new Date()).format('dddd, MMMM DD YYYY, h:mm:ss a'),
  end: moment(new Date()).format('dddd, MMMM DD YYYY, h:mm:ss a')
};

export class Show {
  _id?: string;
  name: string;
  creator: string;
  description: string;
  artist: string;
  info: string;
  genres: string[];
  posters: string[];
  audios: LinkWithEmbedCode[];
  videos: LinkWithEmbedCode[];
  appreciations: string[];
  live: boolean;
  completed: boolean;
  isFree: boolean;
  isFreeForMe: boolean;
  isBought: boolean;
  location: {
    country: string;
  };
  dateCreated: number;
  datePerformance: number;
  timePerformance: {
    start: string;
    end: string;
  };
  tickets: {
    count: number;
    ticketPrice: number;
    ticketsToFund: number;
    ticketsSold: number;
    fundedPercentage: number;
  };
  statistics: {
    likes: number;
    viewers: number;
    followers: number;
  };
  wowza: {
    id: string;
    [key: string]: any
  };

  constructor(eventData?: LaunchEvent) {
    this._id = eventData ? eventData._id : null;
    this.name = eventData ? eventData.name : '';
    this.creator = eventData ? eventData.creator : '';
    this.description = eventData ? eventData.description : '';
    this.artist = eventData ? eventData.artist : '';
    this.info = eventData ? eventData.info : '';
    this.genres = eventData ? eventData.genres : [];
    this.posters = eventData ? eventData.posters : [];
    this.audios = eventData ? eventData.audios : [];
    this.videos = eventData ? eventData.videos : [];
    this.appreciations = eventData ? eventData.appreciations : [];
    this.live = eventData ? eventData.live : false;
    this.completed = eventData ? eventData.completed : false;
    this.isFree = eventData ? eventData.isFree : false;
    this.isFreeForMe = eventData ? eventData.isFreeForMe : false;
    this.isBought = eventData ? eventData.isBought : false;
    this.location = eventData ? eventData.location : {country: ''};
    this.dateCreated = eventData ? eventData.dateCreated : new Date().getTime();
    this.datePerformance = eventData ? eventData.datePerformance : new Date().getTime();
    this.timePerformance = eventData ? eventData.timePerformance : defaultTimePerformance;
    this.tickets = eventData ? eventData.tickets : defaulttickets;
    this.statistics = eventData ? eventData.statistics : defaultStatistics;
    this.wowza = eventData ? eventData.wowza : {id: null};
  }
}
