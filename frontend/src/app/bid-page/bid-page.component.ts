import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LoginService } from '../login.service';
import { LoginData } from '../login-data';

import { BidService } from '../bid.service';
import { Bid } from '../bid'; // dummy data
import {AlertService} from '../alert.service';

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

  activeLogin: LoginData;
  userBids: Bid[];

  cuisineArray = [
    {
      name: "Chinese",
      isChecked: false
    },
    {
      name: "Indian",
      isChecked: false
    },
    {
      name: "Italian",
      isChecked: false
    },
    {
      name: "Japanese",
      isChecked: false
    },
    {
      name: "Korean",
      isChecked: false
    }
  ]

  eventArray = [
    {
      name: "Casual",
      isChecked: false
    },
    {
      name: "Formal",
      isChecked: false
    },
    {
      name: "Party",
      isChecked: false
    }
  ]

  dietaryArray = [
    {
      name: "Halal",
      isChecked: false
    },
    {
      name: "Pescetarians",
      isChecked: false
    },
    {
      name: "Vegan",
      isChecked: false
    },
    {
      name: "No Nuts",
      isChecked: false
    },
    {
      name: "No Milk",
      isChecked: false
    }
  ]

  budgetArray = [
    {
      name: "Less Than $50",
      option: "1",
      isChecked: false
    },
    {
      name: "$51 ~ $250",
      option: "2",
      isChecked: false
    },
    {
      name: "More than $250",
      option: "3",
      isChecked: false
    }
  ]

  sortByOptions: string[] = [
     'Price', 'Location'
   ];

   constructor(private loginService: LoginService,
               private bidService: BidService,
               public dialog: MatDialog,
               private alertService: AlertService,
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



  deleteBid(post_id, bid_id) {
    console.log('Delete Bid popup called');
    if (confirm('Delete bid?')) {
        const result = this.bidService.deleteBid(post_id, bid_id);
      if (result === "success") this.alertService.successAlert('Bid deleted successfully');
      else this.alertService.failAlert('Bid deletion was unsuccessful');
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
      });
      console.log('USER BIDS: ' + this.userBids);
  }

  search (key: string) {
     // this.filteredBids = this.bidService.search(key);
  }

}
