import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { LoginData } from '../login-data';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  activeLogin: LoginData;
  updatedLogin: LoginData;

  constructor(public dialogRef: MatDialogRef<EditProfileComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.activeLogin = data;
  }

  ngOnInit() {
      this.deepCopyLogin();
  }

  deepCopyLogin() {
      for (var i in this.activeLogin) this.updatedLogin[i] = this.activeLogin[i];
  }

}
