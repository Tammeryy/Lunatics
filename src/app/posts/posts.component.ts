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

  openBidPopup(post: Post) {
    console.log("[BID] Title: " + post.title + " | Lowest Bid: " + post.lowest_bid);
    console.log('Bid popup called');
    // Bid - Post title, Post's current lowest bid

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
      post_title: post.title,
      lowest_bid: post.lowest_bid
    };

    // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
    const dialogRef = this.dialog.open(BidTaskComponent, dialogConfig);

    // result refers to 'data' in [mat-dialog-close]
    dialogRef.afterClosed().subscribe(result => {
      // add to list of bids for that post
      if (result) post.bids.push(result);
      for (var i in post.bids) {
        console.log("[POST BID] Bidder: " +  post.bids[i].name + " | Bid Offer: " + post.bids[i].bid_offer);
      }
    });
  }

}
