import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import {POSTS} from '../mock-posts';
import {Post} from '../post'; // dummy data

import { BidTaskComponent } from '../bid-task/bid-task.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  selectedPost: Post;
  posts = POSTS;

  sortByOptions: string[] = [
     'Price', 'Location'
   ];

  constructor(public dialog: MatDialog) { }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }
  ngOnInit() {
  }

  openBidPopup() {
    console.log("[BID] Title: " + this.selectedPost.title + " | Lowest Bid: " + this.selectedPost.lowest_bid);
    console.log('Bid popup called');
    // Bid - Post title, Post's current lowest bid

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
      post_title: this.selectedPost.title,
      lowest_bid: this.selectedPost.lowest_bid
    };

    // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
    const dialogRef = this.dialog.open(BidTaskComponent, dialogConfig);

    // result refers to 'data' in [mat-dialog-close]
    dialogRef.afterClosed().subscribe(result => {
      // add to list of bids for that post
      if (result) this.selectedPost.bids.push(result);
      for (var i in this.selectedPost.bids) {
        console.log("[POST BID] Bidder: " +  this.selectedPost.bids[i].name + " | Bid Offer: " + this.selectedPost.bids[i].bid_offer);
      }
    });
  }

}
