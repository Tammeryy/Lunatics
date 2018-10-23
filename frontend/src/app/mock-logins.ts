import { LoginData } from './login-data';

export const ActiveLogin: LoginData = {
  id: -1,
  username: '',
  password: '',
  name: '',
  phone: '',
  email: '',
  about_me: '',
  skills_exp: ''
};

export const Logins: LoginData[] = [
  {
    id: 0,
    username: 'user',
    password: 'pwd',
    name: 'user',
    phone: '0412345678',
    email: 'user@hotmail.com',
    about_me: "",
    skills_exp: ""
  },
  {
    id: 1,
    username: 'passuser',
    password: 'ped',
    name: 'pass',
    phone: '0452345678',
    email: 'pass@hotmail.com',
    about_me: "pass user",
    skills_exp: "i pass courses"
  },
  {
    id: 2,
    username: 'Cap',
    password: 'Pwd123',
    name: 'Kappa',
    phone: '0422345678',
    email: 'cap@gmail.com',
    about_me: "kappa",
    skills_exp: "kappa"
  },
  {
    id: 3,
    username: 'valid-username',
    password: 'valid-password',
    name: 'valid guy',
    phone: '0432345678',
    email: 'valid.user@hotmail.com',
    about_me: "i am valid. don't question me",
    skills_exp: "everything"
  },
  {
    id: 4,
    username: 'Heather',
    password: 'someStrongPassword',
    name: 'Heather Jones',
    phone: '0442345678',
    email: 'boop@outlook.com',
    about_me: "",
    skills_exp: ""
  },
  {
    id: 5,
    username: 'Eric',
    password: 'eric-pwd',
    name: 'Ric',
    phone: '0452345678',
    email: 'err@hotmail.com',
    about_me: "",
    skills_exp: ""
  }
]
