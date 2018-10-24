import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { LoginService } from '../login.service';
import { LoginData } from '../login-data';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  data: LoginData = {
    id: 0,
    username: '',
    password: '',
    name: '',
    phone: '',
    email: '',
    about_me: '',
    skills_exp: ''
  };

  constructor(private loginService: LoginService,
              public dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit() {
      this.getNewLoginID();
  }

  exitClick(): void {
    this.dialogRef.close();
  }

  verifyDetails(): void {
    // TODO insert verify username and password code
    // valid username and password
    if (this.validSignUp()) {
      alert('Valid sign up details! Creating new account...');
      this.addAccount();
      this.dialogRef.close();
    }
    else {
      alert('Invalid sign up details. Try again.');
    }
  }

  // TODO add verification code from backend
  validSignUp() {
      return this.loginService.validSignUp(this.data);
  }

  addAccount() {
      this.loginService.addAccount(this.data);
  }

  getNewLoginID() {
      this.loginService.getNewLoginID()
          .subscribe(id => this.data.id = id);
  }
}
