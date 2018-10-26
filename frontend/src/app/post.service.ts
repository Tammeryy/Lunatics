import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Post} from './post';
import {POSTS} from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // when user logs in, this is filled and then updated every time the user posts or deletes a post
  activeUserPosts: Post[];

  hasFilter: boolean;

  // original posts
  originalPosts: Post[];

  // stuff that was filtered
  posts: Post[];
  filteredPosts: Post[];

  // sorted post -> can revert back to original once sort is finished
  sorted: Post[];

  newPostID: number;

  constructor() {
    this.init();
  }

  // Grab initial posts data from backend
  init() {
    this.hasFilter = false;
    this.originalPosts = POSTS;
    this.posts = POSTS;
    this.filteredPosts = [];
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

  getPostByID(id) {
    return of(this.posts.filter(post => post.id === id)[0]);
  }

  // Returns true if post added successfully, else false
  addPost(post: Post) {
    this.posts.push(post);
    this.activeUserPosts.push(post);
    this.newPostID++;
    return true;
  }

  editPost(post: Post) {
    // this.posts already gets updated via reference in edit-task updatePost()
    return "success";
  }

  deletePost(post_id) {
    let index = this.posts.findIndex(post => post.id === post_id);
    this.posts.splice(index, 1);

    index = this.activeUserPosts.findIndex(post => post.id === post_id);
    this.activeUserPosts.splice(index, 1);
    return "success";
  }

  closePost(post_id) {
    // Removes post from Browse Task page
    let index = this.posts.findIndex(post => post.id === post_id);
    this.posts.splice(index, 1);

    // Updates task_open variable in post and 'Status' (HTML) from 'Status: Open' to 'Status: Closed'
    index = this.activeUserPosts.findIndex(post => post.id === post_id);
    this.activeUserPosts[index].task_open = "false";
    // this.activeUserPosts.splice(index, 1);
    return "success";
  }

  validPost(post: Post) {
    if (post.title && post.description && post.bid_close && post.event_date && post.location) {
      return true;
    }
    return false;
  }

  filter(key: string) {
    // add everything in all posts to filtered post a = this.originalPosts;
    this.hasFilter = true;
    let a = this.originalPosts;
    let i = 0;
    while (i < a.length) {
      if (a[i].cuisine == key ||
        a[i].quality == key ||
        a[i].diet == key) {
        this.filteredPosts.push(a[i]);
      }
      i++;
    }
    return this.filteredPosts;
  }

  unfilter(key: string) {
    let a = this.filteredPosts;
    for (var i = a.length; i--;) {
      if (a[i].cuisine == key ||
        a[i].quality == key ||
        a[i].diet == key) {

        this.filteredPosts.splice(i, 1);
      }
    }

    if (this.filteredPosts.length == 0) {
      this.hasFilter = false;
      return this.originalPosts;
    }
    return this.filteredPosts;
  }

  search(key: string) {
    let a = this.posts;
    if (!this.hasFilter) {
      a = this.originalPosts;
    }
    let res = [];
    let i = 0;
    while (i < this.posts.length) {
      // concat all the stuff we need together
      let s = this.posts[i].title;
      s.concat(this.posts[i].description, this.posts[i].location, this.posts[i].cuisine, this.posts[i].quality, this.posts[i].diet);
      if (this.substring_(s, key)) {
        res.push(this.posts[i]);
      }
      i++;
    }
    return res;
  }

  substring_(str: string, sub: string) {
    if (str.length < sub.length) {
      return false;
    }
    let i = 0;
    while (i <= str.length - sub.length) {
      if (str.substring(i, i + sub.length).toLowerCase() == sub.toLowerCase()) {
        return true;
      }
      i++;
    }
    return false;
  }

  sort(key: string) {
    if (key == "budget") {
      if (this.hasFilter) {
        // run bubble sort
        this.bubblesort(key);
        return this.filteredPosts;
      } else {
        this.filteredPosts = this.originalPosts;
        this.quicksort(key, 0, this.filteredPosts.length);
        return this.filteredPosts;
      }
    } else {
      console.log(this.originalPosts);
      return this.originalPosts;
    }
  }

  bubblesort(key: string) {
    let outer = this.filteredPosts.length;
    while (outer > 0) {
      let inner = 1;
      while (inner < outer) {
        if (this.filteredPosts[inner - 1].budget < this.filteredPosts[inner].budget) {
          [this.filteredPosts[inner], this.filteredPosts[inner - 1]] = [this.filteredPosts[inner - 1], this.filteredPosts[inner]]
        }
        inner++;
      }
      outer--;
    }
  }

  quicksort(key: string, start, end) {
    if (end <= start) {
      return;
    } else {
      let pivot = this.partition(key, start, end);
      this.quicksort(key, start, pivot);
      this.quicksort(key, pivot + 1, end);
    }
  }

  partition(key, start, end) {
    let pivot = start;
    if (end <= start) {
      let pivot = start;
    } else {
      let pivot = start;
      let i = start;
      while (i < end) {
        if (this.filteredPosts[i].budget < this.filteredPosts[start].budget) {
          pivot++;
          [this.filteredPosts[i], this.filteredPosts[pivot]] = [this.filteredPosts[pivot], this.filteredPosts[i]]
        }
        i++;
      }
      [this.filteredPosts[start], this.filteredPosts[pivot]] = [this.filteredPosts[pivot], this.filteredPosts[start]]
    }
    return pivot;
  }

}
