export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  email: string;
  token: string;
}

export interface RegisterResponse {
  message: string;
  result: {
    id: string;
    email: string;
    createdAt: string;
  };
}
