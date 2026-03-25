import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import { normalizeAuthPayload, storeAuth } from "../utils/auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const res = await API.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });
      const auth = normalizeAuthPayload(res.data, formData.role);

      if (formData.role === "admin" && auth.role !== "admin") {
        setStatus("This account does not have admin access.");
        setSubmitting(false);
        return;
      }

      storeAuth(auth);
      navigate(location.state?.from || (auth.role === "admin" ? "/admin" : "/recipes"));
    } catch (err) {
      console.log(err);
      if (!err.response) {
        setStatus("Cannot connect to the backend server. Make sure backend is running on http://localhost:5000.");
      } else {
        setStatus(err.response?.data?.message || "Login failed. Please check your credentials.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-copy">
        <span className="eyebrow">Login</span>
        <h1>Sign in as admin or user.</h1>
        <p>
          Admin can manage recipes and users. Normal users can log in only after creating an
          account and then browse recipes shared by the admin.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Login</h2>

        <label className="field-label" htmlFor="login-role">
          Role
        </label>
        <select
          id="login-role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="field-input"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <label className="field-label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          value={formData.email}
          placeholder="you@example.com"
          onChange={handleChange}
          className="field-input"
          required
        />

        <label className="field-label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          value={formData.password}
          placeholder="Enter password"
          type="password"
          onChange={handleChange}
          className="field-input"
          required
        />

        {status ? <p className="form-status">{status}</p> : null}

        <button type="submit" className="primary-button primary-button--full" disabled={submitting}>
          {submitting ? "Signing In..." : "Login"}
        </button>

        {formData.role === "user" ? (
          <p className="helper-copy">
            Need an account first?{" "}
            <Link to="/register" className="text-link">
              Register here
            </Link>
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default Login;
