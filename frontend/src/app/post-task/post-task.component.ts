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
    task_open: "true",
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

  addPost() {
      if (this.validPost()) {
        alert('Post details are valid. Adding post to browse list...');
        const result = this.postService.addPost(this.post);// TODO replace with if (this.add)
        this.dialogRef.close(result);
      }
      else {
        alert('Post details are invalid. Try again');
      }
  }

  validPost() {
      // TODO replace with backend verify code
      return this.postService.validPost(this.post);
  }

  getNewPostID() {
    this.postService.getNewPostID()
        .subscribe(id => this.post.id = id);
  }
}
