import { useState } from "react";

const VALID_EMAIL = "intern@test.com";
const VALID_PASSWORD = "123456";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (email !== VALID_EMAIL) {
      newErrors.email = "Invalid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (email === VALID_EMAIL && password !== VALID_PASSWORD) {
      newErrors.password = "Incorrect password.";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    onLogin(email);
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">Log In</h1>
        <p className="login-subtitle">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="someone@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="••••••"
              autoComplete="current-password"
              required
            />
          </div>

          {errors.email && (
            <p className="login-error" role="alert">{errors.email}</p>
          )}
          {errors.password && (
            <p className="login-error" role="alert">{errors.password}</p>
          )}

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
