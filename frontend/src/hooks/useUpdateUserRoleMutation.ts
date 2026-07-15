import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateUserRole,
  type UpdateUserRoleData,
} from "../services/userApi";

import { usersQueryKey } from "./useUsersQuery";

export function useUpdateUserRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRoleData) =>
      updateUserRole(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: usersQueryKey,
      });
    },
  });
}