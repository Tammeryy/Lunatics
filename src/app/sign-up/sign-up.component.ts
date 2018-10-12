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

  accounts = Logins;

  username: string;
  password: string;

  constructor(public dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit() {
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  verifyDetails(): void {
    // TODO insert verify username and password code

    // valid username and password
    if (this.username && this.password) {
      alert('Valid sign up details! Creating new account...');
      this.addAccount();
    }
    else {
      alert('Invalid sign up details. Try again.');
    }
  }

  addAccount() {
    const newAccount: LoginData = { username: this.username, password: this.password };
    this.accounts.push(newAccount);
  }

}
