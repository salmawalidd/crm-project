function RolesPage() {
  return (
    <div>
      <section className="users-header">
        <div>
          <p className="dashboard-eyebrow">
            Administration
          </p>

          <h2>Roles & Permissions</h2>

          <p>
            Review CRM roles and the permissions assigned to
            each access level.
          </p>
        </div>
      </section>

      <section className="dashboard-stats">
        <article className="stat-card">
          <div className="stat-card-header">
            <span>Super Admin</span>
            <div className="stat-icon">⚙</div>
          </div>

          <strong>Full Access</strong>

          <p>
            Manages users, roles, permissions and all CRM
            records.
          </p>
        </article>

        <article className="stat-card">
          <div className="stat-card-header">
            <span>Team Lead</span>
            <div className="stat-icon">♧</div>
          </div>

          <strong>Team Access</strong>

          <p>
            Views team users, customers, leads and team
            performance.
          </p>
        </article>

        <article className="stat-card">
          <div className="stat-card-header">
            <span>Sales</span>
            <div className="stat-icon">◇</div>
          </div>

          <strong>Personal Access</strong>

          <p>
            Manages assigned customers, leads and sales
            activity.
          </p>
        </article>
      </section>

      <section
        className="users-panel"
        style={{ marginTop: "20px" }}
      >
        <div className="users-toolbar">
          <div>
            <h3>Permission Overview</h3>

            <p>
              Current access rules configured in Laravel.
            </p>
          </div>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Permission</th>
                <th>Sales</th>
                <th>Team Lead</th>
                <th>Super Admin</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>View customers</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>

              <tr>
                <td>Create customers</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>

              <tr>
                <td>View users</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>

              <tr>
                <td>Create users</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>

              <tr>
                <td>Assign roles</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>

              <tr>
                <td>Delete users</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>

              <tr>
                <td>Manage roles</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default RolesPage;