import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userEmail");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch (err) {
      users = [];
    }

    const found = Array.isArray(users) && users.find((u) => u.email === email);
    if (!found) {
      setError("No account found for this email. Please register first.");
      return;
    }
    if (found.password !== password) {
      setError("Wrong password. Please try again.");
      return;
    }

    localStorage.setItem("userEmail", email);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">Submit the form to sign in</div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control auth-input"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="alert alert-danger auth-alert">{error}</div>
          )}

          <div className="auth-link-row">
            <span>Not a member? </span>
            <Link to="/register" className="auth-small-link">
              {" "}
              Sign up
            </Link>
          </div>

          <div className="auth-actions">
            <button className="btn auth-cta">LOGIN ME</button>
          </div>

          
        </form>
      </div>
    </div>
  );
}

export default Login;
