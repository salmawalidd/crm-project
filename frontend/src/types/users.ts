export type AdminUser = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  created_at: string;
};

export type UsersResponse = {
  message: string;
  data: {
    users: AdminUser[];
  };
};