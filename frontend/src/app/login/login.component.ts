import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

import { PostService } from '../post.service';
import { LoginService } from '../login.service';
import { LoginData } from '../login-data';

import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data = {
    username: "",
    password: ""
  };

  constructor(private loginService: LoginService,
              private postService: PostService,
              public dialog: MatDialog,
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
      this.setActiveLogin(user);
      this.dialogRef.close(user);
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
      return this.loginService.getUser(username, password);
  }

  setActiveLogin(login: LoginData) {
      this.loginService.setActiveLogin(login);
      this.postService.initActiveUserPosts(login.id);
  }

  clearData() {
    this.data.username = "";
    this.data.password = "";
  }

}
