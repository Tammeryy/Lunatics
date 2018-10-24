import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BidService } from '../bid.service';
import { Bid } from '../bid';
import { Bids } from '../mock-bids';

@Component({
  selector: 'app-view-bids',
  templateUrl: './view-bids.component.html',
  styleUrls: ['./view-bids.component.css']
})
export class ViewBidsComponent implements OnInit {

  bids: Bid[];
  post: any;

  constructor(private bidService: BidService,
              public dialogRef: MatDialogRef<ViewBidsComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    // data refers to dialogConfig.data from Posts component in openBidPopup()
    this.post = data.post;
  }

  ngOnInit() {
      this.getBids();
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  getBids() {
      this.bidService.getBids().subscribe(bids => this.bids = bids);
      this.bids = this.bids.filter(bid => bid.post_id === this.post.id);
      console.log('[VIEW BIDS] Post ID: ' + this.post.id);
       console.log(this.bids);
  }
}
