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

  constructor() {
      this.init();
  }

  // Grab initial logins data from backend
  init() {
      // TODO replace with backend GET
      this.logins = Logins;
      this.activeLogin = ActiveLogin;
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
    return of(Object.keys(this.logins).length);
  }

  addAccount(account: LoginData) {
      this.logins.push(account);
      // TODO remove later
      console.log('[NEW ACCOUNT ADDED: ] id: ' + account.id + " | username: " + account.username + " | password: " + account.password);
  }

  validSignUp(data: LoginData) {
      // TODO replace with backend verifying code to check if valid signup and doesn't exist in backend
      const existingUser = this.logins.filter(login => login.username === data.username || login.email === data.email);
      if (existingUser.length > 0) return false;
      return true;
  }

  getUser(username: string, password: string) {
      const user = this.logins.filter(login => login.username === username && login.password === password);
      if (user.length === 1) return user[0];
      return null;
  }
}
