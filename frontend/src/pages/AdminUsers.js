import { useEffect, useState } from "react";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    API.get("/users")
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data?.users || [];
        setUsers(list);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError("Could not load users. Make sure your backend exposes GET /users for admin.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-stack">
      <section className="section-heading">
        <div>
          <span className="eyebrow">Admin Users</span>
          <h2>Registered user accounts</h2>
        </div>
      </section>

      {loading ? <div className="status-card">Loading users...</div> : null}
      {!loading && error ? <div className="status-card status-card--error">{error}</div> : null}
      {!loading && !error && users.length === 0 ? (
        <div className="status-card">No users found.</div>
      ) : null}

      {!loading && !error && users.length > 0 ? (
        <div className="table-card">
          <div className="table-row table-row--head">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
          </div>
          {users.map((user) => (
            <div className="table-row" key={user._id || user.email}>
              <span>{user.name || "Unknown"}</span>
              <span>{user.email || "No email"}</span>
              <span>{user.role || "user"}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AdminUsers;
