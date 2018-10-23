import { Component, OnInit, Inject, Input } from '@angular/core';
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
      this.deepCopyPost();
  }

  deepCopyPost() {
      for (var i in this.post) this.updatedPost[i] = this.post[i];
  }

  ngOnChanges(changes: any) {
    console.log('CHANGES: ' + changes.title);
  }

  // closes the Post Task pop-up dialog box (done in html page)
  exitClick(): void {
    this.dialogRef.close();
  }

  editTask() {
      if (this.validPost()) {
          alert('Post updated');
          console.log(this.post);
          if (this.updatePost() === "success") alert('Edit task successful!');
          console.log(this.updatedPost);
          console.log(this.post);
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
