import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Post } from '../post';
import { PostService } from '../post.service';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  post: Post;
  updatedPost: Post = {
    id: -1,
    title: null,
    description: null,
    poster_id: -1,
    budget: -1,
    location: null,
    num_ppl: -1,
    bid_close: null,
    event_date: null,
    cuisine: null,
    quality: null,
    diet: null,
    lowest_bid: -1,
    task_open: null
  };

  constructor(private postService: PostService,
              public dialogRef: MatDialogRef<EditTaskComponent>,
              private alertService: AlertService,
              @Inject(MAT_DIALOG_DATA) data) {
      this.post = data.post;
  }

  ngOnInit() {
      this.deepCopyPost();
  }

  deepCopyPost() {
      for (var i in this.post) this.updatedPost[i] = this.post[i];
  }

  // closes the Post Task pop-up dialog box (done in html page)
  exitClick(): void {
    this.dialogRef.close();
  }

  editTask() {
      if (this.validPost()) {
        this.alertService.successAlert('Post updated');
          if (this.updatePost() === "success") alert('Edit task successful!');
          this.dialogRef.close();
      }
      else {
          this.dialogRef.close();
      }
  }

  validPost() {
      return this.postService.validPost(this.post);
  }

  updatePost() {
      console.log(this.updatedPost);
      for (var i in this.updatedPost) {
          if (this.post[i] !== this.updatedPost[i]) this.post[i] = this.updatedPost[i];
      }
      return this.postService.editPost(this.updatedPost);
  }

}
