import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Bid } from '../bid';
import { Bids } from '../mock-bids';

@Component({
  selector: 'app-bid-task',
  templateUrl: './bid-task.component.html',
  styleUrls: ['./bid-task.component.css']
})
export class BidTaskComponent implements OnInit {

  bid: Bid = {
    name: "",
    phone_no: undefined,
    email: "",
    description: "",
    bid_offer: undefined
  };
  post_title: string;
  lowest_bid: number;

  constructor(public dialogRef: MatDialogRef<BidTaskComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    // data refers to dialogConfig.data from Posts component in openBidPopup()
    this.post_title = data.post_title;
    this.lowest_bid = data.lowest_bid;
  }

  ngOnInit() {
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  verifyBid() {
    if (confirm("Bid task?")) {
      if (this.bid.name && this.bid.phone_no && this.bid.email && this.bid.description && this.bid.bid_offer) {
        alert('Bid details are valid. Adding bid to browse list...');
        this.dialogRef.close(this.bid);
      }
      else {
        alert('Bid details are invalid. Try again');
        this.clearData();
      }
    }
  }

  clearData() {
    this.bid.name = "";
    this.bid.phone_no = undefined;
    this.bid.email = "";
    this.bid.description = "";
    this.bid.bid_offer = undefined;
  }

}
