import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LoginData } from './login-data';
import { ActiveLogin, Logins } from './mock-logins';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  activeLogin: LoginData;
  logins: LoginData[];
  newLoginID: number;

  constructor() {
      this.init();
  }

  // Grab initial logins data from backend
  init() {
      // TODO replace with backend GET
      this.logins = Logins;
      this.activeLogin = ActiveLogin;
      this.newLoginID = this.logins.length;
  }

  getActiveLogin(): Observable<LoginData> {
      return of(this.activeLogin);
  }

  setActiveLogin(login: LoginData) {
      this.activeLogin = login;
  }

  getLogins(): Observable<LoginData[]> {
      return of(this.logins);
  }

  getNewLoginID() {
    return of(this.newLoginID);
  }

  addAccount(account: LoginData) {
      this.logins.push(account);
      this.newLoginID++;
      // TODO remove later
      console.log('[NEW ACCOUNT ADDED: ] id: ' + account.id + " | username: " + account.username + " | password: " + account.password);
  }

  deleteAccount(account: LoginData) {
      // TODO add backend code
      this.logins = this.logins.filter(account_obj => account_obj !== account);
      return "success";
  }

  validSignUp(data: LoginData) {
      // TODO replace with backend verifying code to check if valid signup and doesn't exist in backend
      const existingUser = this.logins.filter(login => login.username === data.username || login.email === data.email);
      if (existingUser.length > 0) return false;
      if (data.username && data.password) return true;
      return false;
  }

  getUser(username: string, password: string) {
      const user = this.logins.filter(login => login.username === username && login.password === password);
      if (user.length === 1) return user[0];
      return null;
  }

  editLogin(login: LoginData) {
      // TODO this.activeLogin.... = ...
      if (this.activeLogin.about_me !== login.about_me) this.activeLogin.about_me = login.about_me;
      if (this.activeLogin.skills_exp !== login.skills_exp) this.activeLogin.skills_exp = login.skills_exp;
      return "success";
  }
}
