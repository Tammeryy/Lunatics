import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Bid } from './bid';
import { Bids } from './mock-bids';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  bids: Bid[];

  constructor() {
      this.init();
  }

  // Grab initial bids data from backend
  init() {
      // TODO replace with backend GET
      this.bids = Bids;
  }

  getBids(): Observable<Bid[]> {
      return of(this.bids);
  }

  getNewBidID() {
      return of(Object.keys(this.bids).length);
  }

  // Returns true if bid added successfully, else false
  addBid(bid: Bid) {
      // TODO: add backend push function call (return_value = { result: 'success/fail'})
      this.bids.push(bid);
  }

  // TODO replace with backend call to check for valid bid
  validBid(bid: Bid) {
      if (bid.name && bid.phone_no && bid.email && bid.description && bid.bid_offer) {
          return true;
      }
      return false;
  }
}
