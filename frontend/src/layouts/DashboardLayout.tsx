import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { logout } from "../services/authApi";
import type { User } from "../types/auth";

import "../styles/dashboard.css";

function DashboardLayout() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("user");

  const user: User | null = savedUser
    ? JSON.parse(savedUser)
    : null;

  const canViewUsers =
    user?.permissions.includes("view users") ?? false;

  const canCreateUsers =
    user?.permissions.includes("create users") ?? false;

  const canManageRoles =
    user?.permissions.includes("manage roles") ?? false;

  const canAssignRoles =
    user?.permissions.includes("assign roles") ?? false;

  const dashboardPath = "/dashboard";

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login", {
        replace: true,
      });
    }
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">⌂━</div>

          <div>
            <strong>KEYSTONE</strong>
            <span>CRM Workspace</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to={dashboardPath}
            end
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <span>⌂</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <span>♙</span>
            Customers
          </NavLink>

          <NavLink
            to="/leads"
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <span>◇</span>
            Leads
          </NavLink>

          {canViewUsers && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>♧</span>
              Users
            </NavLink>
          )}

          {canManageRoles && (
            <NavLink
              to="/roles"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span>⚙</span>
              Roles & Permissions
            </NavLink>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>

            <div>
              <strong>{user?.name ?? "User"}</strong>

              <span>
                {user?.roles.join(", ") ?? "No role"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p>CRM Workspace</p>

            <h1>
              Welcome back, {user?.name ?? "User"}
            </h1>
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="topbar-icon"
              aria-label="Notifications"
            >
              ◌
            </button>

            <div className="topbar-profile">
              <div className="topbar-avatar">
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>

              <div>
                <strong>{user?.name ?? "User"}</strong>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </header>

        <section className="dashboard-content">
          <Outlet
            context={{
              user,
              canViewUsers,
              canCreateUsers,
              canManageRoles,
              canAssignRoles,
            }}
          />
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;