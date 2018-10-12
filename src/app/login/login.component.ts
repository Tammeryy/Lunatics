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

  verifyLogin() {
    // TODO: replace with verification code
    if (this.data.username === "user" && this.data.password === "pwd") {
      alert('Login successful. Logging in...');
      this.dialogRef.close(this.data);
    }
    else {
      alert('Login failed. Try again.');
      this.data.username = "";
      this.data.password = "";
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

}
