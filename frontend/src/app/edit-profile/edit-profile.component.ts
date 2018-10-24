import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginData } from '../login-data';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  activeLogin: LoginData;
  updatedLogin: LoginData = {
    id: -1,
    username: "",
    password: "",
    name: "",
    phone: "",
    email: "",
    about_me: "",
    skills_exp: ""
  }

  constructor(private loginService: LoginService,
              public dialogRef: MatDialogRef<EditProfileComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.activeLogin = data.activeLogin;
      console.log('Active Login: ' + this.activeLogin);
  }

  ngOnInit() {
      this.deepCopyLogin();
  }

  exitClick() {
      this.dialogRef.close();
  }

  deepCopyLogin() {
      for (var i in this.activeLogin) this.updatedLogin[i] = this.activeLogin[i];
  }

  editProfile() {
    if (this.validDetails()) {
        alert('Login updated');
        console.log(this.activeLogin);
        if (this.updateProfile() === "success") alert('Edit task successful!');
        console.log(this.updatedLogin);
        console.log(this.activeLogin);
        this.dialogRef.close();
    }
    else {
        this.dialogRef.close();
    }
  }

  validDetails() {
      // TODO if (this.activeLogin.)
      return true;
  }

  updateProfile() {
      console.log(this.updatedLogin);
      if (this.activeLogin.about_me !== this.updatedLogin.about_me) this.activeLogin.about_me = this.updatedLogin.about_me;
      if (this.activeLogin.skills_exp !== this.updatedLogin.skills_exp) this.activeLogin.skills_exp = this.updatedLogin.skills_exp;
      return this.loginService.editLogin(this.updatedLogin);
  }

}
