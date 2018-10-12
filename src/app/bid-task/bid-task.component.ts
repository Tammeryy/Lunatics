import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Bid } from '../bid';

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

  constructor(public dialogRef: MatDialogRef<BidTaskComponent>) { }

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
