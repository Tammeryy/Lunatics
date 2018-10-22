import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { POSTS } from '../mock-posts';
import { Post } from '../post';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.css']
})
export class PostTaskComponent implements OnInit {

  posts = POSTS;

  post: Post = {
    id: Object.keys(this.posts).length+1,
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

  constructor(public dialogRef: MatDialogRef<PostTaskComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.post.poster_id = data.poster_id;
  }

  ngOnInit() {
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
        this.addPost(this.post);
        this.dialogRef.close(true);
      }
      else {
        alert('Post details are invalid. Try again');
        // this.clearData();
      }
    }
  }

  addPost(newPost: any) {
    console.log('Add post called');
    this.posts.push(newPost);
    // TODO needs to also update the user's list of own posts/tasks
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
