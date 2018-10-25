import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Bid } from '../bid';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-view-bid-details',
  templateUrl: './view-bid-details.component.html',
  styleUrls: ['./view-bid-details.component.css']
})
export class ViewBidDetailsComponent implements OnInit {


  post: Post;
  bid: Bid;

  constructor(private postService: PostService,
              public dialogRef: MatDialogRef<ViewBidDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.bid = data.bid;
  }


  ngOnInit() {
      this.getPostByID(this.bid.post_id);
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  getPostByID(id) {
      this.postService.getPostByID(id).subscribe(post => this.post = post);
  }

}
