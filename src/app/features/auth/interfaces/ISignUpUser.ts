interface User {
  name: string;
  email: string;
  role: string;
}

export interface ISignUpResponse {
  message: string;
  user: User;
  token: string;
}

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
