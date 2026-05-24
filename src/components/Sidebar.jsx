import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

import "./Sidebar.css";

const navItems = [
  { to: "/blogs", icon: FileText, label: "Blog" },
  { to: "/profile", icon: LayoutDashboard, label: "Dashboard" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        className="menu-btn"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`premium-sidebar ${open ? "show-sidebar" : ""}`}>

        {/* TOP */}
        <div className="sidebar-top">

          <Link to="/" className="logo">
            InkSphere<span>.</span>
          </Link>

          {/* CLOSE BTN */}
          <button
            className="close-btn"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>

        </div>

        {/* NAV */}
        <nav className="sidebar-nav">

          <p className="sidebar-title">
            GENERAL
          </p>

          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active-link" : ""
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active-link" : ""
                }`
              }
            >
              <ShieldCheck size={18} />
              Admin
            </NavLink>
          )}

          <p className="sidebar-title tools">
            TOOLS
          </p>

          <NavLink
            to="/blogs/:id/edit"
            className="sidebar-link"
          >
            <MessageCircle size={18} />
            Edit Article
          </NavLink>

          <NavLink
            to="/setting"
            className="sidebar-link"
          >
            <Settings size={18} />
            Settings
          </NavLink>

        </nav>

        {/* LOGOUT */}
        {user && (
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <LogOut size={18} />
            Logout
          </button>
        )}

      </aside>
    </>
  );
}