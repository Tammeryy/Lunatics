import { Bid } from './bid';

export class Post {
  title: string;
  description: string;
  poster_name: string;
  lowest_bid: number;
  task_open: boolean;
  due_date: any; // change to date variable type
  location: any; // change to location type
  // Add more variables below
  bids: Bid[];
}
