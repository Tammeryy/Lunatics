import { Bid } from './bid';

export class Post {
  id: number;
  title: string;
  description: string;
  poster_id: number;
  cuisine: string;
  quality: string;
  diet: string;
  num_ppl: number;
  budget: number;
  bid_close: string;; // change to date variable type
  event_date: string;
  location: any; // change to location type
  task_open: string;
  lowest_bid: number;
}
