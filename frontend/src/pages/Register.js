import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/users/register", {
        name,
        email,
        password,
        role,
      });

      navigate("/login", {
        replace: true,
        state: {
          registeredEmail: email,
          justRegistered: true,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-shell auth-shell-centered">
      <form className="auth-panel form-card auth-form-centered" onSubmit={handleRegister}>
        <div className="form-heading">
          <span className="eyebrow">Register</span>
          <h2>Set up your profile</h2>
          <p>Use a clear role and start managing recipes right away.</p>
        </div>

        <label className="field">
          <span>Name</span>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {error ? <div className="status-card status-card--error">{error}</div> : null}

        <button className="button button-primary button-block" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="form-footnote">
          Already registered? <Link to="/login">Go to login</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
