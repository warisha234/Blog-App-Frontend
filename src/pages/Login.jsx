import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import {
  Crown,
  Sparkles,
  PenSquare,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import "./Login.css";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);

      toast.success("Welcome Back!");

      navigate("/blogs");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="login-page">

      {/* GLOW EFFECTS */}
      <div className="login-glow glow-one"></div>
      <div className="login-glow glow-two"></div>

      <div className="login-wrapper">

        {/* LEFT SIDE */}
        <div className="login-left">

          <div className="brand-tag">
            <Sparkles size={16} />
            Premium Blogging Platform
          </div>

          <h1>
            Welcome Back To <span>InkSphere.</span>
          </h1>

          <p>
            Discover trending stories, connect with creative writers,
            and share your own ideas with the world.
          </p>

          {/* CREATIVE CARDS */}
          <div className="creative-boxes">

            <div className="creative-card">

              <div className="creative-icon">
                <PenSquare size={22} />
              </div>

              <div>
                <h3>Write Freely</h3>
                <span>
                  Share your thoughts beautifully.
                </span>
              </div>

            </div>

            <div className="creative-card">

              <div className="creative-icon">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3>Secure Platform</h3>
                <span>
                  Your content stays protected.
                </span>
              </div>

            </div>

          </div>

          {/* STATS */}
          <div className="login-stats">

            <div>
              <h2>12K+</h2>
              <p>Articles</p>
            </div>

            <div>
              <h2>50K+</h2>
              <p>Readers</p>
            </div>

            <div>
              <h2>5K+</h2>
              <p>Writers</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">

          <div className="login-card">

            {/* LOGO */}
            <div className="login-logo">

              <div className="logo-circle">
                <Crown size={28} />
              </div>

              <h2>Sign In</h2>

              <p>
                Continue your creative journey
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="login-form"
            >

              {/* EMAIL */}
              <div className="input-group">

                <label>Email Address</label>

                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  placeholder="you@example.com"
                />

                {errors.email && (
                  <span className="error-text">
                    {errors.email.message}
                  </span>
                )}

              </div>

              {/* PASSWORD */}
              <div className="input-group">

                <label>Password</label>

                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="••••••••"
                />

                {errors.password && (
                  <span className="error-text">
                    {errors.password.message}
                  </span>
                )}

              </div>

              {/* OPTIONS */}
              <div className="login-options">

                <label className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#">
                  Forgot Password?
                </a>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="login-btn"
              >

                {isSubmitting ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}

              </button>

            </form>

            {/* FOOTER */}
            <div className="login-footer">

              Don’t have an account?{" "}

              <Link to="/register">
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}