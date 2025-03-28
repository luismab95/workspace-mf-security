export interface SessionI {
  id: number;
  token: string;
  ipAddress: string;
  information: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  active?: boolean;
}

export interface ResendOtpI {
  email: string;
  type: string;
}
