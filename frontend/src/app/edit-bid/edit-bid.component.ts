import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Post } from '../post';
import { PostService } from '../post.service';
import { BidService } from '../bid.service';
import { Bid } from '../bid';

@Component({
  selector: 'app-edit-bid',
  templateUrl: './edit-bid.component.html',
  styleUrls: ['./edit-bid.component.css']
})
export class EditBidComponent implements OnInit {

  post: Post;
  bid: Bid;
  updatedBid: Bid = {
    post_id: -1,
    bidder_id: -1,
    name: '',
    phone_no: "",
    email: '',
    description: "",
    bid_offer: -1
  };

  constructor(private bidService: BidService,
              private postService: PostService,
              public dialogRef: MatDialogRef<EditBidComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.bid = data.bid;
  }

  ngOnInit() {
      this.deepCopyBid();
      this.getPost();
  }

  deepCopyBid() {
      console.log('Deep copy bid');
      for (var i in this.bid) this.updatedBid[i] = this.bid[i];
      console.log(this.bid);
      console.log(this.updatedBid);
  }

  getPost() {
      let posts;
      this.postService.getPosts().subscribe(allPosts => posts = allPosts);
      this.post = posts.filter(post => post.id === this.bid.post_id)[0];
      console.log('[EDIT BID POST]');
      console.log(this.post);
  }

  // closes the Bid Bid pop-up dialog box (done in html page)
  exitClick(): void {
    this.dialogRef.close();
  }

  editBid() {
      if (this.validBid()) {
          alert('Bid updated');
          console.log(this.bid);
          if (this.updateBid() === "success") alert('Edit task successful!');
          console.log(this.updatedBid);
          console.log(this.bid);
          this.dialogRef.close();
      }
      else {
          alert('Bid failed to update');
          this.dialogRef.close();
      }
  }

  validBid() {
      return this.bidService.validBid(this.bid);
  }

  updateBid() {
      for (var i in this.updatedBid) {
          if (this.bid[i] !== this.updatedBid[i]) this.bid[i] = this.updatedBid[i];
      }
      return this.bidService.editBid(this.updatedBid);
  }

}
