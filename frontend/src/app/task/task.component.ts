import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LoginService } from '../login.service';
import { LoginData } from '../login-data';

import { PostService } from '../post.service';
import { Post } from '../post'; // dummy data

import { EditTaskComponent } from '../edit-task/edit-task.component';
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
      this.getActiveUserPosts();
  }

  openEditPopup(post: Post) {
      console.log('Edit Post popup called');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '30%';
      dialogConfig.data = {
          post: post,
      };

      // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
      const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);

      // result refers to 'data' in [mat-dialog-close]
      dialogRef.afterClosed().subscribe(result => {
      });
  }

  deletePost(post: Post) {
    console.log('Delete Post popup called');
    if (confirm('Delete post?')) {
        const result = this.postService.deletePost(post);
        if (result === "success") alert('Post deleted successfully');
        else alert('Post deletion was unsuccessful');
    }
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

  getActiveUserPosts() {
      // let allPosts: Post[];
      this.postService.getActiveUserPosts().subscribe(posts => this.userPosts = posts);
      // console.log('ALLPOSTSS: ');
      // console.log(allPosts);
      // this.userPosts = allPosts.filter(post => post.poster_id === this.activeLogin.id);
      console.log(this.userPosts);
  }

}
