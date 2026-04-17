import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import { storeAuth } from "../utils/auth";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.registeredEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/users/login", {
        email,
        password,
      });

      storeAuth(res.data);
      const role = res.data?.user?.role || res.data?.role || "user";
      navigate(role === "admin" ? "/" : "/recipes", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-shell auth-shell-centered">
      <form className="auth-panel form-card auth-form-centered" onSubmit={handleLogin}>
        <div className="form-heading">
          <span className="eyebrow">Login</span>
          <h2>Access your account</h2>
          <p>
            {location.state?.justRegistered
              ? "Registration completed. Please log in with your new account."
              : "Enter your email and password to continue."}
          </p>
        </div>

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error ? <div className="status-card status-card--error">{error}</div> : null}

        <button className="button button-primary button-block" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="form-footnote">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
