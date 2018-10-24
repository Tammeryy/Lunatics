import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-bid-details',
  templateUrl: './view-bid-details.component.html',
  styleUrls: ['./view-bid-details.component.css']
})
export class ViewBidDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  exitClick(): void {
    this.dialogRef.close();
  }

}
