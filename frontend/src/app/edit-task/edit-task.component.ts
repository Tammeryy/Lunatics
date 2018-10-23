import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  post: Post;
  updatedPost: Post;

  constructor(private postService: PostService,
              public dialogRef: MatDialogRef<EditTaskComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.post = data.post;
  }

  ngOnInit() {
  }

  // closes the Post Task pop-up dialog box (done in html page)
  exitClick(): void {
    this.dialogRef.close();
  }

  editPost() {
      if (this.validPost()) {
          this.postService.editPost(this.updatedPost);
          alert('Post updated');
          console.log(this.updatedPost);
          console.log(this.post);
          this.dialogRef.close(this.updatedPost);
      }
      else {
          this.dialogRef.close();
      }
  }

  validPost() {
      return this.postService.validPost(this.post);
  }

}
