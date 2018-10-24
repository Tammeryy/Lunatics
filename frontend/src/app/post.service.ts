import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Post } from './post';
import { POSTS } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // when user logs in, this is filled and then updated every time the user posts or deletes a post
  activeUserPosts: Post[];

  posts: Post[];
  newPostID: number;

  constructor() {
      this.init();
  }

  // Grab initial posts data from backend
  init() {
      // TODO replace with backend GET
      this.posts = POSTS;
      this.newPostID = this.posts.length;
  }

  initActiveUserPosts(user_id) {
      this.getPosts().subscribe(posts => this.activeUserPosts = posts.filter(post => post.poster_id === user_id));
  }

  getActiveUserPosts(): Observable<Post[]> {
      return of(this.activeUserPosts);
  }

  getPosts(): Observable<Post[]> {
      return of(this.posts);
  }

  getNewPostID() {
      return of(this.newPostID);
  }

  // Returns true if post added successfully, else false
  addPost(post: Post) {
      // TODO: replace with backend (return_value = { result: 'success/fail'})
      this.posts.push(post);
      this.activeUserPosts.push(post);
      this.newPostID++;
      return true;
  }

  editPost(post: Post) {
      // TODO call backend function and make it return
      return "success";
  }

  deletePost(post: Post) {
      // TODO replace with backend call
      let index = this.posts.findIndex(post_obj => post_obj.id === post.id);
      this.posts.splice(index, 1);

      index = this.activeUserPosts.findIndex(post_obj => post_obj.id === post.id);
      this.activeUserPosts.splice(index, 1);
      return "success";
  }

  // TODO replace with backend call to check for valid post
  validPost(post: Post) {
      if (post.title && post.description && post.bid_close && post.location) {
          return true;
      }
      return false;
  }
}
