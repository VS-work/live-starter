export interface LaunchEvent {
  showName: string;
  tickets: {
    count: number;
    ticketPrice: number;
    ticketsToFund: number;
    ticketsSold: number;
    fundedPercentage: number;
  };
  creator: string;
  dateCreated: string;
  showLocation: string;
  datePerformance: string;
  timePerfomance: {
    start: string;
    end: string;
  };
  artist: string;
  genres: string[];
  poster: any;
  description: string;
  audio: string;
  video: string;
  info: string;
  live: boolean;
  appreciations: any;
  wowza: {
    id: string;
  };
}
