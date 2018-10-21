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
    post_id: Object.keys(this.posts).length+1,
    title: "",
    description: "",
    poster_id: 0,
    poster_name: "",
    lowest_bid: 0,
    task_open: false,
    due_date: "",
    location: "",
    bids: []
  };

  constructor(public dialogRef: MatDialogRef<PostTaskComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.post.poster_id = data.poster_id;
    this.post.poster_name = data.poster_name; // data refers to dialogConfig.data passed in from header component
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
      if (this.post.poster_name && this.post.title && this.post.description && this.post.due_date && this.post.location) {
        this.post.task_open = true;
        alert('Post details are valid. Adding post to browse list...');
        this.addPost(this.post);
        this.dialogRef.close(true);
      }
      else {
        alert('Post details are invalid. Try again');
        this.clearData();
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
    this.post.lowest_bid = 0;
    this.post.task_open = false;
    this.post.due_date = "";
    this.post.location = "";
    this.post.bids = [];
  }
}
