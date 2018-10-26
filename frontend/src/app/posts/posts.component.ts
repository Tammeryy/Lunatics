import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { PostService } from '../post.service';
import { POSTS } from '../mock-posts';
import { Post } from '../post'; // dummy data

import { BidTaskComponent } from '../bid-task/bid-task.component';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  filteredPosts: Post[];
  selected = "";

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
  // Used to display all posts on home page
  posts: Post[];
  // activeLogin: LoginData;

  sortByOptions: string[] = [
    'budget'
  ];


  constructor(private postService: PostService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
      // this.getActiveLogin();
      this.getPosts();
  }

  filterPost(name: string, ischecked: boolean){
    if (ischecked == true) {
      //filter post
      this.filteredPosts = this.postService.filter(name);
    } else {
      //unfilter post
      this.filteredPosts = this.postService.unfilter(name);
    }
  }

  openBidPopup(post: Post) {
    console.log('Bid popup called');
    // Bid - Post title, Post's current lowest bid

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
      selected_post: post,
      post_id: post.id,
      post_title: post.title,
      lowest_bid: post.lowest_bid
    };


    // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
    const dialogRef = this.dialog.open(BidTaskComponent, dialogConfig);

    // result refers to 'data' in [mat-dialog-close]
    dialogRef.afterClosed().subscribe(newBid_offer => {
      if (newBid_offer && newBid_offer < post.lowest_bid) post.lowest_bid = newBid_offer;
    });
  }

  getPosts() {
      this.postService.getPosts()
        .subscribe(posts => {
          this.posts = posts;
          this.filteredPosts = posts;
        });
  }

  sort() {
    // TODO insert function from postservices to get the filtered posts
  }

  search (key: string) {
     this.filteredPosts = this.postService.search(key);
  }
}
