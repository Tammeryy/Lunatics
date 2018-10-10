import { Component, OnInit } from '@angular/core';
import { LOGIN } from '../mock-logins';
import { LoginData } from '../login-data'; // dummy data
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'LunaWhip';

  login = LOGIN;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  // Login - will remove later
  username: string;
  password: string;
  validLogin: boolean = false;

  openLogin() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
        data: {username: this.username, password: this.password}
    };

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    // result refers to 'data' in [mat-dialog-close]
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.username = result.username;
      this.password = result.password;
      if (this.username === "valid-username" && this.password === "valid-password") {
        this.validLogin = true;
        // this.openPostPopup();
      }
    });
  });

  openPostPopup() {
    console.log('Post task called');
    if (this.validLogin == false) this.openLogin();

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
        // data: {title: this.newTask['title'], desc: this.newTask['desc']}
    };

    // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
    const dialogRef = this.dialog.open(PostTaskComponent, dialogConfig);

    // result refers to 'data' in [mat-dialog-close]
    dialogRef.afterClosed().subscribe(result => {
      console.log('The post popup dialog was closed');
      // this.newTask['title'] = result.title;
      // this.newTask['desc'] = result.desc;
    });
  }
}
