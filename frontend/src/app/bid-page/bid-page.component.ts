import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LoginService } from '../login.service';
import { LoginData } from '../login-data';

import { BidService } from '../bid.service';
import { Bid } from '../bid'; // dummy data

import { EditBidComponent } from '../edit-bid/edit-bid.component';
import { ViewBidDetailsComponent } from '../view-bid-details/view-bid-details.component';
import {Post} from "../post";
import {PostService} from "../post.service"; // change to view bid component

@Component({
  selector: 'app-bid-page',
  templateUrl: './bid-page.component.html',
  styleUrls: ['./bid-page.component.css']
})
export class BidPageComponent implements OnInit {

  filteredBids: Bid[];
  activeLogin: LoginData;
  userBids: Bid[];

  filteredPosts: Bid[];


  sortByOptions: string[] = [
     'Price', 'Location'
   ];

   constructor(private loginService: LoginService,
               private bidService: BidService,
               public dialog: MatDialog,
               private postService: PostService,) {
   }

  ngOnInit() {
      this.getActiveLogin();
      this.getActiveUserBids();
  }

  openEditPopup(bid: Bid) {
      console.log('Edit Bid popup called');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '30%';
      dialogConfig.data = {
          bid: bid,
      };

      // opens a dialog box/pop-up displaying contents from BidBidComponent's html file
      const dialogRef = this.dialog.open(EditBidComponent, dialogConfig);

      // result refers to 'data' in [mat-dialog-close]
      dialogRef.afterClosed().subscribe(result => {
      });
  }

  getPosts() {
    this.postService.getPosts()
      .subscribe(bid => {
        this.userBids = bid;
        this.filteredPosts = bid;
      });
  }

  deleteBid(post_id, bid_id) {
    console.log('Delete Bid popup called');
    if (confirm('Delete bid?')) {
        const result = this.bidService.deleteBid(post_id, bid_id);
        if (result === "success") alert('Bid deleted successfully');
        else alert('Bid deletion was unsuccessful');
    }
  }

  openViewBidDetailsPopup(bid: Bid) {
    console.log('View Bid popup called');
    // Bid - Bid title, Bid's current lowest bid

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
        bid: bid,
    };

    // opens a dialog box/pop-up displaying contents from BidBidComponent's html file
    const dialogRef = this.dialog.open(ViewBidDetailsComponent, dialogConfig);
  }

  getActiveLogin() {
      this.loginService.getActiveLogin()
          .subscribe(activeLogin => this.activeLogin = activeLogin);
  }

  getActiveUserBids() {
      // let allBids: Bid[];
      this.bidService.getActiveUserBids().subscribe(bids => {
        this.userBids = bids;
        this.filteredBids = bids;
      });
      console.log('USER BIDS: ' + this.userBids);
  }

  search (key: string) {
     // this.filteredBids = this.bidService.search(key);
  }

}
