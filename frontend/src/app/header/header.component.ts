import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LoginComponent } from '../login/login.component';
import { LoginData } from '../login-data'; // dummy data
import { LoginService } from '../login.service';

import { PostTaskComponent } from '../post-task/post-task.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    title = 'LunaWhip';

    activeLogin: LoginData;
    requestPostTask: boolean = false;

    constructor(private loginService: LoginService,
                public dialog: MatDialog) { }

    ngOnInit() {
    }

    openLogin() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';

        const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

        // loginData refers to 'data' in [mat-dialog-close]
        dialogRef.afterClosed().subscribe(loginData => {
            console.log('The dialog was closed');
            if (loginData) {
                this.activeLogin = loginData;
                if (this.requestPostTask) {
                    this.requestPostTask = false;
                    this.openPostPopup();
                }
            }
            else {
                this.requestPostTask = false;
            }
        });
    }

    openPostPopup() {
        console.log('[PRE] open post popup called');
        this.requestPostTask = true;
        if (!this.activeLogin) {
            this.openLogin();
        }
        else {
            console.log('Post task called');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '30%';
            dialogConfig.data = {
                poster_id: this.activeLogin.id,
            };

            // opens a dialog box/pop-up displaying contents from PostTaskComponent's html file
            const dialogRef = this.dialog.open(PostTaskComponent, dialogConfig);

            // result refers to 'data' in [mat-dialog-close]
            dialogRef.afterClosed().subscribe(result => {
                if (result === "success") alert('Post added successfully');
                this.requestPostTask = false;
            });
        }
    }

    openSignUp() {
        console.log('Sign up called');
        // call signUp function from header component (or somewhere?)
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';

        // opens a dialog box/pop-up displaying contents from SignUpComponent's html file
        const dialogRef = this.dialog.open(SignUpComponent, dialogConfig);
    }

    logOut() {
        this.activeLogin = undefined;
        this.loginService.setActiveLogin(null);
    }
}
