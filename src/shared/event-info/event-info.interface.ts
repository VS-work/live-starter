import { Funding } from '../funding-container/funding.interface';

export interface EventInfo {
  artistId: string;
  showHashtags: string[];
  tickets: Funding;
}
