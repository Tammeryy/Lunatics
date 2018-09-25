import { Component, OnInit } from '@angular/core';
import {POSTS} from '../mock-posts';
import {Post} from '../post'; // dummy data
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  selectedPost: Post;
  posts = POSTS;
  constructor() { }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }
  ngOnInit() {
  }

}
