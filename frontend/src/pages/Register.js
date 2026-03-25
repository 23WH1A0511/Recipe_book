import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      await API.post("/users/register", { ...formData, role: "user" });
      setStatus("Account created successfully. Redirecting to login...");
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      console.log(err);
      if (!err.response) {
        setStatus("Cannot connect to the backend server. Make sure backend is running on http://localhost:5000.");
      } else {
        setStatus(err.response?.data?.message || "Registration failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-copy">
        <span className="eyebrow">User Registration</span>
        <h1>Create a user account before logging in.</h1>
        <p>
          This registration form is for website users. Admin accounts are expected to be managed
          separately through your backend setup.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Create User Account</h2>

        <label className="field-label" htmlFor="register-name">
          Name
        </label>
        <input
          id="register-name"
          name="name"
          value={formData.name}
          placeholder="Your name"
          onChange={handleChange}
          className="field-input"
          required
        />

        <label className="field-label" htmlFor="register-email">
          Email
        </label>
        <input
          id="register-email"
          name="email"
          value={formData.email}
          placeholder="you@example.com"
          onChange={handleChange}
          className="field-input"
          required
        />

        <label className="field-label" htmlFor="register-password">
          Password
        </label>
        <input
          id="register-password"
          name="password"
          value={formData.password}
          placeholder="Create password"
          type="password"
          onChange={handleChange}
          className="field-input"
          required
        />

        {status ? <p className="form-status">{status}</p> : null}

        <button type="submit" className="primary-button primary-button--full" disabled={submitting}>
          {submitting ? "Creating Account..." : "Register"}
        </button>

        <p className="helper-copy">
          Already registered?{" "}
          <Link to="/login" className="text-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
