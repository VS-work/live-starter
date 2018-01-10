import { Funding } from '../funding-container/funding.interface';

export interface EventInfo {
  showLocation: string;
  artistId: string;
  showGenres: string[];
  tickets: Funding;
}
