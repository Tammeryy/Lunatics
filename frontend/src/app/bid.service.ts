import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
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

  constructor(private apiService: ApiService) {
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
/*
      return this.apiService.getBids();
*/
      return of(this.bids);
  }

  getNewBidID() {
      return of(this.newBidID);
  }

  // Returns true if bid added successfully, else false
  addBid(bid: Bid) {
      // return this.apiService.makeBid(bid);
      this.bids.push(bid);
      this.activeUserBids.push(bid);
      this.newBidID++;
      return "success";
  }

  editBid(bid: Bid) {
      // this.bids already gets updated via reference in edit-bid updateBid()
      // TODO call backend function and make it return
      return "success";
  }

  deleteBid(post_id, bidder_id) {
      // TODO replace with backend call
      let index = this.bids.findIndex(bid => bid.post_id === post_id && bid.bidder_id === bidder_id);
      this.bids.splice(index, 1);

      index = this.activeUserBids.findIndex(bid => bid.post_id === post_id && bid.bidder_id === bidder_id);
      this.activeUserBids.splice(index, 1);
      return "success";
  }

  validBid(bid: Bid) {
      if (bid.description && bid.bid_offer) {
          return true;
      }
      return false;
  }

}
