import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Bid } from './bid';
import { Bids } from './mock-bids';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  // when user logs in, this is filled and then updated every time the user bids or deletes a bid
  activeUserBids: Bid[];

  bids: Bid[];
  newBidID: number;

  constructor() {
      this.init();
  }

  // Grab initial bids data from backend
  init() {
      // TODO replace with backend GET
      this.bids = Bids;
      this.newBidID = this.bids.length;
  }

  initActiveUserBids(user_id) {
      this.getBids().subscribe(bids => this.activeUserBids = bids.filter(bid => bid.bidder_id === user_id));
  }

  getActiveUserBids(): Observable<Bid[]> {
      return of(this.activeUserBids);
  }

  getBids(): Observable<Bid[]> {
      return of(this.bids);
  }

  getNewBidID() {
      return of(this.newBidID);
  }

  // Returns true if bid added successfully, else false
  addBid(bid: Bid) {
      // TODO: add backend push function call (return_value = { result: 'success/fail'})
      this.bids.push(bid);
      this.newBidID++;
  }

  deleteBid(bid: Bid) {
      // TODO replace with backend call
      let index = this.bids.findIndex(bid_obj => bid_obj.id === bid.id);
      this.bids.splice(index, 1);

      index = this.activeUserBids.findIndex(bid_obj => bid_obj.id === bid.id);
      this.activeUserBids.splice(index, 1);
      return "success";
  }

  // TODO replace with backend call to check for valid bid
  validBid(bid: Bid) {
      if (bid.name && bid.phone_no && bid.email && bid.description && bid.bid_offer) {
          return true;
      }
      return false;
  }
}
