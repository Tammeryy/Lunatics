import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LoginData } from '../login-data';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  activeLogin: LoginData;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
      this.getActiveLogin();
  }

  // pop up
  editProfile() {

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
