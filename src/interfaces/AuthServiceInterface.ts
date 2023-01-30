export interface UserLoginDTO {
  email: string;
  pwd: string;
}

export interface UserLoginResponse {
  status: number;
  msg: string;
  data: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  pwd: string;
  status: number;
}
