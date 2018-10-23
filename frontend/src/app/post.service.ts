import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Post } from './post';
import { POSTS } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = POSTS;

  constructor() { }

  getPosts(): Observable<Post[]> {
      return of(this.posts);
  }

  getNewPostID() {
    return of(Object.keys(this.posts).length+1);
  }

  addPost(post: Post) {
      this.posts.push(post);
  }
}
