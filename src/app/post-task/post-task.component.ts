// Inject, MAT_DIALOG_DATA and PostData is needed to access PostData
// MatDialog, MatDialogRef is needed to access the dialog box from HeaderComponent
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { POST } from '../mock-posts';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.css']
})
export class PostTaskComponent implements OnInit {

  post = POST;

  constructor(public dialogRef: MatDialogRef<PostTaskComponent>) { }

  ngOnInit() {
  }

  // closes the Post Task pop-up dialog box (done in html page)
  exitClick(): void {
    this.dialogRef.close();
  }

}
