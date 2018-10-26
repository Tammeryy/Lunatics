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

  posts: Post[];
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
      this.posts = this.postService.filter(name);
    } else {
      //unfilter post
      this.posts = this.postService.unfilter(name);
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
          console.log('GET POSTS');
          console.log(this.posts);
        });
  }

  sort() {
    this.postService.sort("budget").subscribe(sortedPosts => this.posts = sortedPosts);
    // this.quicksort("budget", 0, this.posts.length);
    console.log(this.posts);
  }

  quicksort(key: string, start, end) {
    console.log(this.posts);
    if (end <= start) {
      return;
    } else {
      let pivot = this.partition(key, start, end);
      this.quicksort(key, start, pivot);
      this.quicksort(key, pivot + 1, end);
    }
  }

  partition(key, start, end) {
    let pivot = start;
    if (end <= start) {
      let pivot = start;
    } else {
      let pivot = start;
      let i = start;
      while (i < end) {
        if (this.posts[i].budget < this.posts[start].budget) {
          pivot++;
          // [this.posts[i], this.posts[pivot]] = [this.posts[pivot], this.posts[i]]
          let temp = this.posts[i];
          this.posts[i] = this.posts[pivot];
          this.posts[pivot] = temp;
        }
        i++;
      }
      let temp = this.posts[start];
      this.posts[start] = this.posts[pivot];
      this.posts[pivot] = temp;
      // [this.posts[start], this.posts[pivot]] = [this.posts[pivot], this.posts[start]]
    }
    return pivot;
  }


  search (key: string) {
     this.posts = this.postService.search(key);
  }
}
