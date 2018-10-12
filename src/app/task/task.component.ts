import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import {POSTS} from '../mock-posts';
import {Post} from '../post'; // dummy data

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  selectedPost: Post;
  posts = POSTS;
  user_posts = this.posts;

  sortByOptions: string[] = [
     'Price', 'Location'
   ];

   constructor(public dialog: MatDialog) {
     this.user_posts = this.posts.filter(post => post.poster_id === 1);
   }

   onSelect(post: Post): void {
     this.selectedPost = post;
   }

  ngOnInit() {
  }

}
