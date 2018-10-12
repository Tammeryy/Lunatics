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
    email: ""
  };

  constructor(public dialogRef: MatDialogRef<BidTaskComponent>) { }

  ngOnInit() {
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  verifyBid() {
    if (this.bid.name && this.bid.phone_no && this.bid.email) {
      alert('Post details are valid. Adding post to browse list...');
      this.dialogRef.close(this.bid);
    }
    else {
      alert('Post details are invalid. Try again');
      this.clearData();
    }
  }

  clearData() {
    this.bid.name = "";
    this.bid.phone_no = undefined;
    this.bid.email = "";
  }

}
