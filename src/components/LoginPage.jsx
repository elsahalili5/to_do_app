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
    <div className="flex flex-1 items-center justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Log In</h1>
        <p className="text-sm text-gray-500 mb-6">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
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
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
            {errors.email && (
              <p className="text-xs text-red-500" role="alert">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
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
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
            {errors.password && (
              <p className="text-xs text-red-500" role="alert">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-1 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
