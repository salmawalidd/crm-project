import api from "./api";

import type {
  AdminUser,
  UsersResponse,
} from "../types/users";

type UserResponse = {
  message: string;
  data: {
    user: AdminUser;
  };
};

export async function getUsers(): Promise<AdminUser[]> {
  const response = await api.get<UsersResponse>("/users");

  return response.data.data.users;
}

export async function updateUserRole(
  userId: number,
  role: "sales" | "team-lead",
): Promise<AdminUser> {
  const response = await api.patch<UserResponse>(
    `/users/${userId}/role`,
    { role },
  );

  return response.data.data.user;
}