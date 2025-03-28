export interface UpdatePasswordI {
  password: string;
  otp: string;
}

export interface UserI {
  id?: number;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  type?: string;
  status?: boolean;
}
