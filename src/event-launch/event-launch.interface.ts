export interface LaunchEvent {
  _id?: string;
  name: string;
  creator: string;
  description: string;
  artist: string;
  genres: string[];
  posters: string[];
  audios: string[];
  videos: string[];
  appreciations: string[];
  info: string;
  live: boolean;
  completed: boolean;
  location: {
    country: string;
  };
  dateCreated: string;
  datePerformance: string;
  timePerfomance: {
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
    likes: string[];
    viewers: string[];
    followers: string[];
  };
  wowza: {
    id: string;
    [key: string]: any
  };
}
