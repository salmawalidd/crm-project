export type User = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
};

export type AuthResponse = {
  message: string;
  data: {
    user: User;
    token: string;
  };
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};