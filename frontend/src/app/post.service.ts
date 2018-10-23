import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Post } from './post';
import { POSTS } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];

  constructor() {
      this.init();
  }

  // Grab initial posts data from backend
  init() {
      // TODO replace with backend GET
      this.posts = POSTS;
  }

  getPosts(): Observable<Post[]> {
      return of(this.posts);
  }

  getNewPostID() {
      return of(Object.keys(this.posts).length);
  }

  // Returns true if post added successfully, else false
  addPost(post: Post) {
      // TODO: replace with backend (return_value = { result: 'success/fail'})
      this.posts.push(post);
      return true;
  }

  // TODO replace with backend call to check for valid post
  validPost(post: Post) {
      if (post.title && post.description && post.bid_close && post.location) {
          return true;
      }
      return false;
  }
}
