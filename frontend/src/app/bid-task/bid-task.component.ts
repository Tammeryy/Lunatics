import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Post } from '../post';

import { BidService } from '../bid.service';
import { Bid } from '../bid';

@Component({
  selector: 'app-bid-task',
  templateUrl: './bid-task.component.html',
  styleUrls: ['./bid-task.component.css']
})
export class BidTaskComponent implements OnInit {

  bid: Bid = {
    post_id: 0, // TODO need to get post_id
    name: "",
    phone_no: undefined,
    email: "",
    description: "",
    bid_offer: undefined
  };
  post: Post;

  constructor(private bidService: BidService,
              public dialogRef: MatDialogRef<BidTaskComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    // data refers to dialogConfig.data from Posts component in openBidPopup()
    this.post = data.selected_post;
  }

  ngOnInit() {
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  verifyBid() {
      if (this.validBid()) {
        alert('Bid details are valid. Adding bid to browse list...');
        console.log("[BID] Title: " + this.post.title + " | Lowest Bid: " + this.post.lowest_bid);
        this.addBid();
        this.dialogRef.close(this.bid.bid_offer);
      }
      else {
        alert('Bid details are invalid. Try again');
        this.clearData();
      }
  }

  clearData() {
    this.bid.name = "";
    this.bid.phone_no = undefined;
    this.bid.email = "";
    this.bid.description = "";
    this.bid.bid_offer = undefined;
  }

  validBid() {
      return this.bidService.validBid(this.bid);
  }

  // Adds bid to bids list.
  // If adding bid to backend is successful, make success alert popup
  addBid() {
      this.bidService.addBid(this.bid);
  }

}
