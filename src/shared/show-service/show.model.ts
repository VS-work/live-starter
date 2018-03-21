import * as moment from 'moment';
import { WowzaResponse } from '../wowza-streaming-cloud/new-stream.model';

class DefaultTimePerformance {
  start: string = moment(new Date()).format('dddd, MMMM DD YYYY, h:mm:ss a');
  end: string = moment(new Date()).format('dddd, MMMM DD YYYY, h:mm:ss a');
};

class Defaulttickets {
  count = 0;
  ticketPrice = 0;
  ticketsToFund = 0;
  ticketsSold = 0;
  fundedPercentage = 0;
};

class DefaultStatistics {
  likes = 0;
  viewers = 0;
  followers = 0;
};

export interface NewEventResponse {
  message: string;
  newId: string;
}

export class Show {
  _id?: string;
  name: string;
  creator: string;
  description: string;
  artist: string;
  info: string;
  genres: string[];
  posters: string[];
  audios: string[];
  videos: string[];
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
  wowza: WowzaResponse;

  constructor(eventData?: Show) {
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
    this.timePerformance = eventData ? eventData.timePerformance : new DefaultTimePerformance();
    this.tickets = eventData ? eventData.tickets : new Defaulttickets();
    this.statistics = eventData ? eventData.statistics : new DefaultStatistics();
    this.wowza = eventData ? eventData.wowza : {id: null};
  }
}
