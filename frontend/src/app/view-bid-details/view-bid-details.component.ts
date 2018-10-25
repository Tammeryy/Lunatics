import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-view-bid-details',
  templateUrl: './view-bid-details.component.html',
  styleUrls: ['./view-bid-details.component.css']
})
export class ViewBidDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewBidDetailsComponent>) { }

  ngOnInit() {
  }

  exitClick(): void {
    this.dialogRef.close();
  }

}
