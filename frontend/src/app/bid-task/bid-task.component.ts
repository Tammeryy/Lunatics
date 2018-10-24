import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Post } from '../post';

import { BidService } from '../bid.service';
import { Bid } from '../bid';

import { LoginService } from '../login.service';
import { LoginData } from '../login-data';

@Component({
  selector: 'app-bid-task',
  templateUrl: './bid-task.component.html',
  styleUrls: ['./bid-task.component.css']
})
export class BidTaskComponent implements OnInit {

  activeLogin: LoginData;
  bid: Bid = {
    post_id: -1, // TODO need to get post_id
    bidder_id: -1,
    name: "",
    phone_no: undefined,
    email: "",
    description: "",
    bid_offer: undefined
  };
  post: Post;

  constructor(private bidService: BidService,
              private loginService: LoginService,
              public dialogRef: MatDialogRef<BidTaskComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    // data refers to dialogConfig.data from Posts component in openBidPopup()
    this.post = data.selected_post;
    this.bid.post_id = this.post.id;
  }

  ngOnInit() {
      this.getActiveLogin();
      this.autofillFields();
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  // If this user is logged in (aka has an account), then autofill the fields already provided
  // Fields: bidder_id, name, phone_no, email
  autofillFields() {
      if (this.activeLogin) {
          console.log('[BID TASK] ActiveLogin exists: ' + this.activeLogin.id + " | username: " + this.activeLogin.username);
          this.bid.bidder_id = this.activeLogin.id;
          this.bid.name = this.activeLogin.name;
          this.bid.phone_no = this.activeLogin.phone;
          this.bid.email = this.activeLogin.email;
      }
  }

  // Adds bid to bids list.
  // If adding bid to backend is successful, make success alert popup
  addBid() {
      if (this.validBid()) {
          alert('Bid details are valid. Adding bid to browse list...');
          console.log("[BID] Title: " + this.post.title + " | Lowest Bid: " + this.post.lowest_bid);
          const result = this.bidService.addBid(this.bid);
          if (result === "success") {
              alert('Bid added successfully!');
              this.dialogRef.close(this.bid.bid_offer);
          }
          else {
              alert('Bid could not be added.');
              this.dialogRef.close();
          }
      }
      else {
        alert('Bid details are invalid. Try again');
      }
  }

  getActiveLogin() {
      this.loginService.getActiveLogin()
          .subscribe(activeLogin => this.activeLogin = activeLogin);
  }

  validBid() {
      if (this.bid.name && this.bid.phone_no && this.bid.email && this.bid.description && this.bid.bid_offer) {
          return true;
      }
      return false;
  }

}
