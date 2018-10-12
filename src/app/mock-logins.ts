import { LoginData } from './login-data';

export const currentLogin: LoginData = {
    id: 0,
    username: "",
    password: ""
}

export const Logins: LoginData[] = [
  {
    id: 1,
    username: 'user',
    password: 'pwd',
  },
  {
    id: 2,
    username: 'Cap',
    password: 'Pwd123',
  },
  {
    id: 3,
    username: 'valid-username',
    password: 'valid-password'
  },
  {
    id: 4,
    username: 'Heather',
    password: 'someStrongPassword'
  },
  {
    id: 5,
    username: 'Eric',
    password: 'eric-pwd',
  }
]
