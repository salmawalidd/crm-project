import { useMemo, useState } from "react";

import { useUpdateUserRoleMutation } from "../hooks/useUpdateUserRoleMutation";
import { useUsersQuery } from "../hooks/useUsersQuery";

import type { User } from "../types/auth";
import type { AdminUser } from "../types/users";

function formatRole(role: string): string {
  return role
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

function getErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

function UsersPage() {
  const savedUser = localStorage.getItem("user");

  const currentUser: User | null = savedUser
    ? JSON.parse(savedUser)
    : null;

  const canCreateUsers =
    currentUser?.permissions.includes("create users") ?? false;

  const canDeleteUsers =
    currentUser?.permissions.includes("delete users") ?? false;

  const canAssignRoles =
    currentUser?.permissions.includes("assign roles") ?? false;

  const [search, setSearch] = useState("");

  const [editingUser, setEditingUser] =
    useState<AdminUser | null>(null);

  const [selectedRole, setSelectedRole] =
    useState<"sales" | "team-lead">("sales");

  const [roleError, setRoleError] = useState("");

  const usersQuery = useUsersQuery();
  const updateRoleMutation =
    useUpdateUserRoleMutation();

  const users = usersQuery.data ?? [];
  const loading = usersQuery.isPending;
  const savingRole = updateRoleMutation.isPending;

  const pageError = usersQuery.isError
    ? getErrorMessage(
        usersQuery.error,
        "Unable to load users.",
      )
    : "";

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter((user) => {
      const roleText = user.roles.join(" ").toLowerCase();

      return (
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        roleText.includes(value)
      );
    });
  }, [search, users]);

  function openRoleModal(user: AdminUser) {
    if (
      !canAssignRoles ||
      user.roles.includes("super-admin")
    ) {
      return;
    }

    setEditingUser(user);

    setSelectedRole(
      user.roles.includes("team-lead")
        ? "team-lead"
        : "sales",
    );

    setRoleError("");
  }

  function closeRoleModal() {
    if (savingRole) {
      return;
    }

    setEditingUser(null);
    setRoleError("");
  }

  async function handleRoleUpdate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!editingUser || !canAssignRoles) {
      return;
    }

    setRoleError("");

    try {
      await updateRoleMutation.mutateAsync({
        userId: editingUser.id,
        role: selectedRole,
      });

      setEditingUser(null);
    } catch (error: unknown) {
      setRoleError(
        getErrorMessage(
          error,
          "Unable to update the user role.",
        ),
      );
    }
  }

  return (
    <div className="users-page">
      <section className="users-header">
        <div>
          <p className="dashboard-eyebrow">
            Administration
          </p>

          <h2>User Management</h2>

          <p>
            Manage team members, access levels and CRM
            responsibilities.
          </p>
        </div>

        {canCreateUsers && (
          <button
            type="button"
            className="dashboard-primary"
          >
            + Add User
          </button>
        )}
      </section>

      <section className="users-panel">
        <div className="users-toolbar">
          <div>
            <h3>All Users</h3>

            <p>
              {users.length}{" "}
              {users.length === 1
                ? "account"
                : "accounts"}
            </p>
          </div>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by name, email or role..."
            className="users-search"
          />
        </div>

        {loading && (
          <div className="users-state">
            Loading users...
          </div>
        )}

        {!loading && pageError && (
          <div className="users-state error">
            <p>{pageError}</p>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                void usersQuery.refetch();
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !pageError &&
          filteredUsers.length === 0 && (
            <div className="users-state">
              No users found.
            </div>
          )}

        {!loading &&
          !pageError &&
          filteredUsers.length > 0 && (
            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Created</th>

                    {(canAssignRoles ||
                      canDeleteUsers) && (
                      <th className="actions-column">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => {
                    const isSuperAdmin =
                      user.roles.includes(
                        "super-admin",
                      );

                    return (
                      <tr key={user.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar">
                              {user.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {user.name}
                              </strong>

                              <span>{user.email}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`role-badge role-${
                              user.roles[0] ??
                              "none"
                            }`}
                          >
                            {user.roles.length > 0
                              ? user.roles
                                  .map(formatRole)
                                  .join(", ")
                              : "No Role"}
                          </span>
                        </td>

                        <td>
                          {new Date(
                            user.created_at,
                          ).toLocaleDateString()}
                        </td>

                        {(canAssignRoles ||
                          canDeleteUsers) && (
                          <td>
                            <div className="users-actions">
                              {canAssignRoles && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openRoleModal(
                                      user,
                                    )
                                  }
                                  disabled={
                                    isSuperAdmin
                                  }
                                >
                                  Edit Role
                                </button>
                              )}

                              {canDeleteUsers &&
                                !isSuperAdmin && (
                                  <button
                                    type="button"
                                    className="danger"
                                  >
                                    Delete
                                  </button>
                                )}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </section>

      {editingUser && canAssignRoles && (
        <div
          className="modal-backdrop"
          onMouseDown={closeRoleModal}
        >
          <section
            className="role-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-modal-title"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <p className="dashboard-eyebrow">
                  User access
                </p>

                <h3 id="role-modal-title">
                  Change User Role
                </h3>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeRoleModal}
                aria-label="Close"
                disabled={savingRole}
              >
                ×
              </button>
            </div>

            <div className="modal-user">
              <div className="user-avatar">
                {editingUser.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong>{editingUser.name}</strong>
                <span>{editingUser.email}</span>
              </div>
            </div>

            <form onSubmit={handleRoleUpdate}>
              <label
                htmlFor="role"
                className="modal-label"
              >
                Role
              </label>

              <select
                id="role"
                value={selectedRole}
                onChange={(event) =>
                  setSelectedRole(
                    event.target.value as
                      | "sales"
                      | "team-lead",
                  )
                }
                className="role-select"
                disabled={savingRole}
              >
                <option value="sales">
                  Sales
                </option>

                <option value="team-lead">
                  Team Lead
                </option>
              </select>

              {roleError && (
                <p className="modal-error">
                  {roleError}
                </p>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeRoleModal}
                  disabled={savingRole}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="dashboard-primary"
                  disabled={savingRole}
                >
                  {savingRole
                    ? "Saving..."
                    : "Save Role"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default UsersPage;