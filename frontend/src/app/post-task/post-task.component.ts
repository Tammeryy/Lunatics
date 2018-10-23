import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PostService } from '../post.service';
import { POSTS } from '../mock-posts';
import { Post } from '../post';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.css']
})
export class PostTaskComponent implements OnInit {

  post: Post = {
    id: 0,
    title: "",
    description: "",
    poster_id: 0,
    cuisine: "",
    quality: "",
    diet: "",
    num_ppl: 0,
    budget: 0,
    event_date: "",
    bid_close: "", // change to date variable type
    location: "",
    task_open: true,
    lowest_bid: 0,
  };

  constructor(private postService: PostService,
              public dialogRef: MatDialogRef<PostTaskComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.post.poster_id = data.poster_id;
  }

  ngOnInit() {
      this.getNewPostID();
  }

  // closes the Post Task pop-up dialog box (done in html page)
  exitClick(): void {
    this.dialogRef.close();
  }

  verifyPost() {
    if (confirm("Post task?")) {
      // TODO: need somewhere to store current login data to access
      if (this.post.title && this.post.description && this.post.bid_close && this.post.location) {
        this.post.task_open = true;
        alert('Post details are valid. Adding post to browse list...');
        this.addPost();
        this.dialogRef.close(true);
      }
      else {
        alert('Post details are invalid. Try again');
        // this.clearData();
      }
    }
  }

  addPost() {
    console.log('Add post called');
    this.postService.addPost(this.post);
  }

  getNewPostID() {
    this.postService.getNewPostID()
        .subscribe(id => this.post.id = id);
  }

  clearData() {
    this.post.title ="";
    this.post.description = "";
    this.post.cuisine = "";
    this.post.quality = "";
    this.post.diet = "";
    this.post.budget = 0;
    this.post.event_date = "";
    this.post.bid_close = "";
    this.post.location = "";
  }
}
