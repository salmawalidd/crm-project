import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import loginBackground from "../assets/login-background.jpg";
import { ApiError } from "../lib/fetcher";
import {
  loginSchema,
  type LoginFormData,
} from "../schemas/loginSchema";
import { login } from "../services/authApi";

import "../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [workspace, setWorkspace] = useState<
    "address" | "marq"
  >("address");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@crm.com",
      password: "Admin@123",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setServerError("");

    try {
      const response = await login(data);

      localStorage.setItem(
        "token",
        response.data.token,
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user),
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        setServerError(error.message);
        return;
      }

      setServerError("Unable to sign in.");
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
          The Best Commercial Real
          <br />
          Estate Opportunities In
          <br />
          And Around Egypt
        </h1>

        <p>Your Key To Better Investments ..</p>
      </section>

      <section className="auth-card">
        <div className="card-brand">
          <div className="card-key">
            <span>⌂</span>
            <span className="key-line" />
          </div>
        </div>

        <h2>Welcome!</h2>

        <p className="auth-subtitle">
          Sign In To Your Workspace To Keep The
          <br />
          Pipeline Moving.
        </p>

        <div className="workspace-switch">
          <button
            type="button"
            className={
              workspace === "address"
                ? "workspace-option active"
                : "workspace-option"
            }
            onClick={() => setWorkspace("address")}
          >
            The Address
          </button>

          <button
            type="button"
            className={
              workspace === "marq"
                ? "workspace-option active"
                : "workspace-option"
            }
            onClick={() => setWorkspace("marq")}
          >
            MarQ
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="auth-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="User@theaddress.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />

            {errors.email && (
              <p className="field-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password here.."
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                {...register("password")}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (current) => !current,
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "◉" : "◎"}
              </button>
            </div>

            {errors.password && (
              <p className="field-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="button"
            className="forgot-password"
          >
            Forgot Password?
          </button>

          {serverError && (
            <p className="auth-error">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Signing In..."
              : "Sign In"}
          </button>

          <p className="auth-footer">
            Don&apos;t have an account?{" "}
            <Link to="/register">
              Create account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;