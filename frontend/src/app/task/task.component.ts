import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LoginService } from '../login.service';
import { LoginData } from '../login-data';

import { PostService } from '../post.service';
import { Post } from '../post'; // dummy data

import { ViewBidsComponent } from '../view-bids/view-bids.component'; // change to view bid component

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  activeLogin: LoginData;
  userPosts: Post[];

  sortByOptions: string[] = [
     'Price', 'Location'
   ];

   constructor(private loginService: LoginService,
               private postService: PostService,
               public dialog: MatDialog) {
   }

  ngOnInit() {
      this.getActiveLogin();
      this.getUserPosts();
  }

  openViewBidPopup(post: Post) {
    console.log('View Bid popup called');
    // Bid - Post title, Post's current lowest bid

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
        post: post,
    };

    // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
    const dialogRef = this.dialog.open(ViewBidsComponent, dialogConfig);
  }

  getActiveLogin() {
      this.loginService.getActiveLogin()
          .subscribe(activeLogin => this.activeLogin = activeLogin);
  }

  getUserPosts() {
      // let allPosts: Post[];
      this.postService.getPosts().subscribe(posts => this.userPosts = posts.filter(post => post.poster_id === this.activeLogin.id));
      // console.log('ALLPOSTSS: ');
      // console.log(allPosts);
      // this.userPosts = allPosts.filter(post => post.poster_id === this.activeLogin.id);
      console.log(this.userPosts);
  }

}
