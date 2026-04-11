import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");
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
    if (password !== retype) {
      setError("Passwords do not match");
      return;
    }

    const raw = localStorage.getItem("users");
    let users = [];
    try {
      users = raw ? JSON.parse(raw) : [];
    } catch (err) {
      users = [];
    }

    if (users.find((u) => u.email === email)) {
      setError("User with this email already exists. Please login.");
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("userEmail", email);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-title">Register the new account</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control auth-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          <div className="mb-3">
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Retype password"
              value={retype}
              onChange={(e) => setRetype(e.target.value)}
            />
          </div>

          {error && (
            <div className="alert alert-danger auth-alert">{error}</div>
          )}

          <div className="auth-link-row">
            <span>Already a member? </span>
            <Link to="/login" className="auth-small-link">
              {" "}
              Sign in
            </Link>
          </div>

          <div className="auth-actions">
            <button className="btn auth-cta">SIGN ME UP</button>
          </div>

        
        </form>
      </div>
    </div>
  );
}

export default Register;
