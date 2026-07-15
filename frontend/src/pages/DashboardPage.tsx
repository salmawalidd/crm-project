import type { User } from "../types/auth";

function DashboardPage() {
  const savedUser = localStorage.getItem("user");

  const user: User | null = savedUser
    ? JSON.parse(savedUser)
    : null;

  const isSuperAdmin =
    user?.roles.includes("super-admin") ?? false;

  const isTeamLead =
    user?.roles.includes("team-lead") ?? false;

  return (
    <div>
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-eyebrow">
            {isSuperAdmin
              ? "Administration"
              : isTeamLead
                ? "Team Management"
                : "Sales Workspace"}
          </p>

          <h2>
            {isSuperAdmin
              ? "Super Admin Dashboard"
              : isTeamLead
                ? "Team Lead Dashboard"
                : "Sales Dashboard"}
          </h2>

          <p>
            {isSuperAdmin
              ? "Manage users, roles, permissions, customers and CRM activity."
              : isTeamLead
                ? "Monitor your sales team, customers and lead pipeline."
                : "Track your assigned customers, leads and sales activity."}
          </p>
        </div>
      </section>

      <section className="dashboard-stats">
        <article className="stat-card">
          <div className="stat-card-header">
            <span>
              {isSuperAdmin
                ? "Total Users"
                : isTeamLead
                  ? "Team Members"
                  : "My Customers"}
            </span>

            <div className="stat-icon">♧</div>
          </div>

          <strong>0</strong>

          <p>
            {isSuperAdmin
              ? "All CRM users"
              : isTeamLead
                ? "Sales agents in your team"
                : "Your assigned customers"}
          </p>
        </article>

        <article className="stat-card">
          <div className="stat-card-header">
            <span>
              {isSuperAdmin
                ? "Team Leads"
                : isTeamLead
                  ? "Team Customers"
                  : "My Leads"}
            </span>

            <div className="stat-icon">◇</div>
          </div>

          <strong>0</strong>

          <p>
            {isSuperAdmin
              ? "Team-lead accounts"
              : isTeamLead
                ? "Customers managed by your team"
                : "Your active leads"}
          </p>
        </article>

        <article className="stat-card">
          <div className="stat-card-header">
            <span>
              {isSuperAdmin
                ? "Sales Agents"
                : isTeamLead
                  ? "Active Leads"
                  : "Follow-ups"}
            </span>

            <div className="stat-icon">♙</div>
          </div>

          <strong>0</strong>

          <p>
            {isSuperAdmin
              ? "Active sales accounts"
              : isTeamLead
                ? "Leads handled by your team"
                : "Upcoming follow-ups"}
          </p>
        </article>

        <article className="stat-card">
          <div className="stat-card-header">
            <span>Conversion Rate</span>
            <div className="stat-icon">↗</div>
          </div>

          <strong>0%</strong>

          <p>
            {isSuperAdmin
              ? "Company conversion rate"
              : isTeamLead
                ? "Team conversion rate"
                : "Your conversion rate"}
          </p>
        </article>
      </section>
    </div>
  );
}

export default DashboardPage;