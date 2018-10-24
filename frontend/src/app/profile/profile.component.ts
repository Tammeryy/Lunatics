import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LoginData } from '../login-data';
import { LoginService } from '../login.service';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  activeLogin: LoginData;

  constructor(private loginService: LoginService,
              public dialog: MatDialog) { }

  ngOnInit() {
      this.getActiveLogin();
  }

  // pop up - can edit skills_exp, about me,
  editProfile() {
    console.log('Edit Post popup called');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    dialogConfig.data = {
        activeLogin: this.activeLogin,
    };

    // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
    const dialogRef = this.dialog.open(EditProfileComponent, dialogConfig);

    // result refers to 'data' in [mat-dialog-close]
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteAccount() {
      if (confirm('Are you sure you want to delete this account?')) {
          const result = this.loginService.deleteAccount(this.activeLogin);
          if (result === "success") {
            this.loginService.setActiveLogin(null);
            this.activeLogin = new LoginData();
            alert('Account deleted successfully. You will be redirected to the home page.');
          }
          else alert('Account deletion unsuccessful.');
      }
  }

  // Gets acc
  getActiveLogin() {
      this.loginService.getActiveLogin().subscribe(activeLogin => this.activeLogin = activeLogin);
      console.log('username: ' + this.activeLogin.username);
  }

}
