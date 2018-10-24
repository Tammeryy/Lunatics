import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { TaskComponent } from './task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { PostTaskComponent } from './post-task/post-task.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BidTaskComponent } from './bid-task/bid-task.component';
import { ViewBidsComponent } from './view-bids/view-bids.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { BidPageComponent } from './bid-page/bid-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditBidComponent } from './edit-bid/edit-bid.component';
import { ViewBidDetailsComponent } from './view-bid-details/view-bid-details.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'task', component: TaskComponent},
  {path: 'bidpage', component: BidPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostsComponent,
    ProfileComponent,
    TaskComponent,
    LoginComponent,
    PostTaskComponent,
    SignUpComponent,
    BidTaskComponent,
    ViewBidsComponent,
    EditTaskComponent,
    BidPageComponent,
    EditProfileComponent,
    EditBidComponent,
    ViewBidDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  exports: [
    ReactiveFormsModule,
  ],
  providers: [AppComponent, HeaderComponent],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, PostTaskComponent, SignUpComponent, BidTaskComponent, ViewBidsComponent, EditTaskComponent, EditProfileComponent, ViewBidDetailsComponent, EditBidComponent]
})
export class AppModule { }
