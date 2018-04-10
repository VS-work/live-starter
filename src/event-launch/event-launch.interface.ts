import { LinkWithEmbedCode } from '../shared/show-service/show.model';

export interface LaunchEvent {
  _id?: string;
  name: string;
  creator: string;
  description: string;
  artist: string;
  genres: string[];
  posters: string[];
  audios: LinkWithEmbedCode[];
  videos: LinkWithEmbedCode[];
  appreciations: string[];
  info: string;
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
}

export interface NewEventResponse {
  message: string;
  newId: string;
}
