import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LoginComponent } from '../login/login.component';
import { currentLogin } from '../mock-logins'; // remove later
import { Logins } from '../mock-logins';
import { LoginData } from '../login-data'; // dummy data

import { PostTaskComponent } from '../post-task/post-task.component';
import { PostService } from '../post.service';
import { Post } from '../post';

import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    title = 'LunaWhip';

    activeLogin: LoginData;
    posts: Post[];
    logins = Logins; // remove later
    requestPostTask: boolean = false;

    constructor(private postService: PostService,
                public dialog: MatDialog) { }

    ngOnInit() {
        this.getPosts();
    }

    openLogin() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';

        const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

        // result refers to 'data' in [mat-dialog-close]
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                this.activeLogin = result;
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
    }


    // Data Retrieval functions
    getPosts(): void {
        this.postService.getPosts()
            .subscribe(posts => this.posts = posts);
    }
}
