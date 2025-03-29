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

export interface TokenI {
  email: string;
  exp: number;
  firstname: string;
  iat: number;
  id: number;
  lastname: string;
  sessionId: number;
}
