import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Logins } from '../mock-logins';
import { LoginData } from '../login-data';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  logins = Logins;

  data: LoginData = {
    id: Object.keys(this.logins).length+1,
    username: "",
    password: ""
  };

  constructor(public dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit() {
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  verifyDetails(): void {
    // TODO insert verify username and password code

    // valid username and password
    if (this.data.username && this.data.password) {
      alert('Valid sign up details! Creating new account...');
      this.addAccount();
      this.dialogRef.close();
    }
    else {
      alert('Invalid sign up details. Try again.');
      this.clearData();
    }
  }

  addAccount() {
    this.logins.push(this.data);
  }

  clearData() {
    this.data.username = "";
    this.data.password = "";
  }

}
