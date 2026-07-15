import {
  get,
  patch,
} from "../lib/fetcher";

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

export type UpdateUserRoleData = {
  userId: number;
  role: "sales" | "team-lead";
};

export async function getUsers(): Promise<AdminUser[]> {
  const response = await get<UsersResponse>("/users");

  return response.data.users;
}

export async function updateUserRole(
  data: UpdateUserRoleData,
): Promise<AdminUser> {
  const response = await patch<
    UserResponse,
    { role: "sales" | "team-lead" }
  >(`/users/${data.userId}/role`, {
    role: data.role,
  });

  return response.data.user;
}