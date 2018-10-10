import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LoginComponent } from '../login/login.component';
import { LOGIN } from '../mock-logins';
import { LoginData } from '../login-data'; // dummy data

import { PostTaskComponent } from '../post-task/post-task.component';
import { POST, POSTS } from '../mock-posts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'LunaWhip';

  login = LOGIN;
  post = POST;
  posts = POSTS;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  // Login - will remove later
  username: string;
  password: string;
  loggedIn: boolean = false;
  requestPostTask: boolean = false;

  openLogin() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
        data: {username: "", password: ""}
    };

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    // result refers to 'data' in [mat-dialog-close]
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.username = result.username;
      this.password = result.password;
      if (this.username === "user" && this.password === "pwd") {
        this.loggedIn = true;
        if (this.requestPostTask) this.openPostPopup();
      }
      else {
        this.openLogin();
      }
    });
  });

  openPostPopup() {
    this.requestPostTask = true;
    if (!this.loggedIn) {
       this.openLogin();
    }
    else {
      console.log('Post task called');

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '30%';
      dialogConfig.data = {
          data: {title: "", description: ""}  // can remove later
      };

      // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
      const dialogRef = this.dialog.open(PostTaskComponent, dialogConfig);

      // result refers to 'data' in [mat-dialog-close]
      dialogRef.afterClosed().subscribe(result => {
        console.log('The post popup dialog was closed');
        console.log("[POST POPUP] title: " + result.title + " | description: " + result.description + " | poster: " + result.poster_name);
        // TODO verification to make sure post details are valid? should it be done in post-task component?
        this.addPost(result);
      });
    }

  }

  openSignUp() {
    console.log('Sign up called');
    // TODO: add later
  }

  addPost(newPost: any) {
    console.log('Add post called');
    this.posts.push(newPost);
  }

  logOut() {
    this.loggedIn = false;
  }
}
