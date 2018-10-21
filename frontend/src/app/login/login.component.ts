import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { LoginData } from '../login-data';

import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: LoginData = {
    id: 0, // all login ids should start from 1 
    username: "",
    password: ""
  };

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  // Check if user w/ username and password exists.
  // Returns matching LoginData object to dialogRef if user exists.
  verifyLogin() {
    // TODO: add/replace with verification code
    const user: LoginData = this.getUser(this.data.username, this.data.password);
    if (user) {
      alert('Login successful. Logging in...');
      this.dialogRef.close(this.data);
    }
    else {
      alert('Login failed. Try again.');
      this.clearData();
    }
  }

  signUp(): void {
    // call signUp function from header component (or somewhere?)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';

    // opens a dialog box/pop-up displaying contents from SignUpComponent's html file
    const dialogRef = this.dialog.open(SignUpComponent, dialogConfig);
  }

  // TODO: replace code to call loginService/API to verify with backend data
  getUser(username: string, password: string) {
    // replace with something like return this.loginService.getUser(username, password);
    if (username === "user" && password === "pwd") {
        const user: LoginData = {
            id: 1,
            username: "user",
            password: "pwd"
        }
        return user;
    }

    return null;
  }

  clearData() {
    this.data.id = 0;
    this.data.username = "";
    this.data.password = "";
  }

}
