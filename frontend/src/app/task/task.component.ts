import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import {POSTS} from '../mock-posts';
import {Post} from '../post'; // dummy data

import { ViewBidsComponent } from '../view-bids/view-bids.component'; // change to view bid component

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  selectedPost: Post; // remove?
  posts = POSTS;
  user_posts = this.posts;

  sortByOptions: string[] = [
     'Price', 'Location'
   ];

   constructor(public dialog: MatDialog) {
     // need to add service so we can retrieve activeLogin details from any component
     this.user_posts = this.posts.filter(post => post.poster_id === 1);
   }

   onSelect(post: Post): void { // remove?
     this.selectedPost = post;
     console.log('Selected post: ' + this.selectedPost);
   }

  ngOnInit() {
  }

  openViewBidPopup(post: Post) {
    console.log('View Bid popup called');
    // Bid - Post title, Post's current lowest bid

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
        post: post
    };

    // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
    const dialogRef = this.dialog.open(ViewBidsComponent, dialogConfig);
  }

}
