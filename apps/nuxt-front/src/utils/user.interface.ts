export interface User {
  id?: string;
  email?: string;
  rolePermission?: {
    user?: string[];
    admin?: string[];
  };
}

export interface LoginCheckResponse {
  isLoggedIn: boolean;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}
