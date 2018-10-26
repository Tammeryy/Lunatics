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

  filteredPosts: Post[];
  activeLogin: LoginData;
  userPosts: Post[];

  sortByOptions: string[] = [
     'Price', 'Location'
   ];

  cuisineArray = [
    {
      name: "Chinese",
      isChecked: false
    },
    {
      name: "Indian",
      isChecked: false
    },
    {
      name: "Italian",
      isChecked: false
    },
    {
      name: "Japanese",
      isChecked: false
    },
    {
      name: "Korean",
      isChecked: false
    }
  ]

  eventArray = [
    {
      name: "Casual",
      isChecked: false
    },
    {
      name: "Formal",
      isChecked: false
    },
    {
      name: "Party",
      isChecked: false
    }
  ]

  dietaryArray = [
    {
      name: "Halal",
      isChecked: false
    },
    {
      name: "Pescetarians",
      isChecked: false
    },
    {
      name: "Vegan",
      isChecked: false
    },
    {
      name: "No Nuts",
      isChecked: false
    },
    {
      name: "No Milk",
      isChecked: false
    }
  ]

  budgetArray = [
    {
      name: "Less Than $50",
      option: "1",
      isChecked: false
    },
    {
      name: "$51 ~ $250",
      option: "2",
      isChecked: false
    },
    {
      name: "More than $250",
      option: "3",
      isChecked: false
    }
  ]
  
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

  deletePost(post_id) {
    console.log('Delete Post popup called');
    if (confirm('Delete post?')) {
        const result = this.postService.deletePost(post_id);
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
      this.postService.getActiveUserPosts().subscribe(posts => {
          this.userPosts = posts;
          this.filteredPosts = posts;
      });
      console.log(this.userPosts);
  }

  search(key: string) {
      this.filteredPosts = this.postService.search(key);
  }

}
