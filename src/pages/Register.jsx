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
  Users,
} from "lucide-react";

import "./Register.css";

export default function Register() {

  const { register: signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ name, email, password }) => {

    try {

      await signup(name, email, password);

      toast.success("Account Created Successfully!");

      navigate("/blogs");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (

    <div className="register-page">

      {/* GLOW */}
      <div className="register-glow glow-one"></div>
      <div className="register-glow glow-two"></div>

      <div className="register-wrapper">

        {/* LEFT SIDE */}
        <div className="register-left">

          <div className="register-tag">
            <Sparkles size={15} />
            Join Creative Community
          </div>

          <h1>
            Start Your Journey <span>With InkSphere.</span>
          </h1>

          <p>
            Create blogs, share your creativity,
            connect with writers and build your
            digital presence beautifully.
          </p>

          {/* FEATURE CARDS */}
          <div className="register-features">

            <div className="register-feature-card">

              <div className="feature-icon-box">
                <PenSquare size={22} />
              </div>

              <div>
                <h3>Create Blogs</h3>

                <span>
                  Publish your ideas professionally.
                </span>
              </div>

            </div>

            <div className="register-feature-card">

              <div className="feature-icon-box">
                <Users size={22} />
              </div>

              <div>
                <h3>Grow Audience</h3>

                <span>
                  Reach thousands of readers globally.
                </span>
              </div>

            </div>

            <div className="register-feature-card">

              <div className="feature-icon-box">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h3>Safe Platform</h3>

                <span>
                  Secure & modern blogging experience.
                </span>
              </div>

            </div>

          </div>

          {/* STATS */}
          <div className="register-stats">

            <div>
              <h2>50K+</h2>
              <p>Readers</p>
            </div>

            <div>
              <h2>12K+</h2>
              <p>Blogs</p>
            </div>

            <div>
              <h2>5K+</h2>
              <p>Writers</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">

          <div className="register-card">

            {/* LOGO */}
            <div className="register-logo">

              <div className="register-logo-circle">
                <Crown size={28} />
              </div>

              <h2>Create Account</h2>

              <p>
                Join the premium blogging experience
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="register-form"
            >

              {/* NAME */}
              <div className="register-input-group">

                <label>Full Name</label>

                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  placeholder="John Carter"
                />

                {errors.name && (
                  <span className="register-error">
                    {errors.name.message}
                  </span>
                )}

              </div>

              {/* EMAIL */}
              <div className="register-input-group">

                <label>Email Address</label>

                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  placeholder="you@example.com"
                />

                {errors.email && (
                  <span className="register-error">
                    {errors.email.message}
                  </span>
                )}

              </div>

              {/* PASSWORD */}
              <div className="register-input-group">

                <label>Password</label>

                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  type="password"
                  placeholder="••••••••"
                />

                {errors.password && (
                  <span className="register-error">
                    {errors.password.message}
                  </span>
                )}

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="register-btn"
              >

                {isSubmitting ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}

              </button>

            </form>

            {/* FOOTER */}
            <div className="register-footer">

              Already have an account?{" "}

              <Link to="/login">
                Sign In
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}