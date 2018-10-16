import { Injectable } from '@angular/core';

import { Post } from './post';
import { POSTS } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  getPosts(): Post[] {
      return POSTS;
  }

  getNewPostID() {
    return Object.keys(POSTS).length+1;
  }

  

}
