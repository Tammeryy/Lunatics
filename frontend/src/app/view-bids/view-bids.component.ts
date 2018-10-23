import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Bid } from '../bid';
import { Bids } from '../mock-bids';

@Component({
  selector: 'app-view-bids',
  templateUrl: './view-bids.component.html',
  styleUrls: ['./view-bids.component.css']
})
export class ViewBidsComponent implements OnInit {

  bids: Bid[] = Bids;
  post: any;

  constructor(public dialogRef: MatDialogRef<ViewBidsComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    // data refers to dialogConfig.data from Posts component in openBidPopup()
    this.post = data.post;
    this.bids = this.bids.filter(bid => bid.post_id === this.post.id);
  }

  ngOnInit() {
  }

  exitClick(): void {
    this.dialogRef.close();
  }
}
