// Inject, MAT_DIALOG_DATA and PostData is needed to access PostData
// MatDialog, MatDialogRef is needed to access the dialog box from HeaderComponent
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { POST } from '../mock-posts';
import { Post } from '../post';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.css']
})
export class PostTaskComponent implements OnInit {

  // post = POST;
  post: Post = {
    title: "",
    description: "",
    poster_name: "",
    task_budget: undefined,
    task_open: false,
    due_date: "",
    location: ""
  };

  constructor(public dialogRef: MatDialogRef<PostTaskComponent>) { }

  ngOnInit() {
  }

  // closes the Post Task pop-up dialog box (done in html page)
  exitClick(): void {
    this.dialogRef.close();
  }

  verifyPost() {
    // TODO: need somewhere to store current login data to access
    this.post.poster_name = "POSTER NAME";
    this.post.task_open = true;
    if (this.post.title && this.post.description && this.post.task_budget && this.post.due_date && this.post.location) {
      alert('Post details are valid. Adding post to browse list...');
      this.dialogRef.close(this.post);
    }
    else {
      alert('Post details are invalid. Try again');
      this.post = {};
    }
  }
}
