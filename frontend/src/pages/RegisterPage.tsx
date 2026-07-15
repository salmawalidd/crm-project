import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import loginBackground from "../assets/login-background.jpg";
import { register } from "../services/authApi";

import "../styles/auth.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] =
    useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user),
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error: any) {
      const validationErrors =
        error.response?.data?.errors;

      const firstValidationError = validationErrors
        ? Object.values(validationErrors)[0]
        : null;

      setError(
        Array.isArray(firstValidationError)
          ? String(firstValidationError[0])
          : error.response?.data?.error?.message ??
              error.response?.data?.message ??
              "Unable to create your account.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="auth-page"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(7, 10, 21, 0.72) 0%,
            rgba(7, 10, 21, 0.38) 53%,
            rgba(11, 10, 10, 0.62) 100%
          ),
          url(${loginBackground})
        `,
      }}
    >
      <div className="auth-bottom-fade" />

      <header className="auth-logo">
        <div className="logo-roof">
          <span className="logo-house">⌂</span>
          <span className="logo-line" />
        </div>

        <strong>KEYSTONE</strong>
        <small>EST 2026</small>
      </header>

      <section className="auth-intro">
        <h1>
          Build Better Relationships.
          <br />
          Manage Every Opportunity.
          <br />
          Grow With Confidence.
        </h1>

        <p>Your Workspace For Smarter Sales.</p>
      </section>

      <section className="auth-card register-card">
        <div className="card-brand">
          <div className="card-key">
            <span>⌂</span>
            <span className="key-line" />
          </div>
        </div>

        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Join your workspace and start managing your
          pipeline.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="User@theaddress.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
              >
                {showPassword ? "◉" : "◎"}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password-confirmation">
              Confirm Password
            </label>

            <input
              id="password-confirmation"
              type={showPassword ? "text" : "password"}
              value={passwordConfirmation}
              onChange={(event) =>
                setPasswordConfirmation(event.target.value)
              }
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
            />
          </div>

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;