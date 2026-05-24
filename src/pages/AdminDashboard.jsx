import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

import {
  Users,
  FileText,
  MessageCircle,
  Heart,
  Trash2,
  Shield,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await api.get("/admin/stats");
      return data;
    },
  });

  const { data: users } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data } = await api.get("/admin/users");
      return data;
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id) =>
      api.delete(`/admin/users/${id}`),
    onSuccess: () => {
      qc.invalidateQueries(["admin-users"]);
      qc.invalidateQueries(["admin-stats"]);
      toast.success("User deleted");
    },
  });

  const toggleRole = useMutation({
    mutationFn: (id) =>
      api.patch(`/admin/users/${id}/role`),
    onSuccess: () => {
      qc.invalidateQueries(["admin-users"]);
      toast.success("Role updated");
    },
  });

  const stats = [
    {
      label: "Users",
      value: data?.users,
      icon: Users,
      color: "blue",
    },
    {
      label: "Blogs",
      value: data?.blogs,
      icon: FileText,
      color: "green",
    },
    {
      label: "Comments",
      value: data?.comments,
      icon: MessageCircle,
      color: "purple",
    },
    {
      label: "Likes",
      value: data?.likes,
      icon: Heart,
      color: "pink",
    },
  ];

  return (
    <div className="admin-page">

      {/* GLOW */}
      <div className="admin-glow one"></div>
      <div className="admin-glow two"></div>

      {/* HEADER */}
      <div className="admin-header">

        <div>

          <div className="admin-tag">
            <Sparkles size={14} />
            Control Panel
          </div>

          <h1>Admin Dashboard</h1>

          <p>
            Manage users, blogs and platform analytics
          </p>

        </div>

      </div>

      {/* STATS */}
      <div className="stats-grid">

        {stats.map((s) => {
          const Icon = s.icon;

          return (
            <div
              key={s.label}
              className="stat-card"
            >
              <div className={`icon ${s.color}`}>
                <Icon size={20} />
              </div>

              <h2>{s.value ?? "0"}</h2>
              <p>{s.label}</p>
            </div>
          );
        })}

      </div>

      {/* CONTENT GRID */}
      <div className="admin-grid">

        {/* BLOGS */}
        <div className="panel">

          <h3>
            <FileText size={16} />
            Recent Blogs
          </h3>

          <div className="list">

            {data?.recentBlogs?.map(
              (blog) => (
                <div
                  key={blog._id}
                  className="list-item"
                >
                  <div>
                    <h4>
                      {blog.title}
                    </h4>
                    <p>
                      by {blog.author?.name}
                    </p>
                  </div>
                </div>
              )
            )}

          </div>

        </div>

        {/* USERS */}
        <div className="panel">

          <h3>
            <Users size={16} />
            Users
          </h3>

          <div className="user-list">

            {users?.map((u) => (
              <div
                key={u._id}
                className="user-item"
              >

                <div className="avatar">
                  {u.avatar ? (
                    <img
                      src={u.avatar}
                    />
                  ) : (
                    u.name?.charAt(0)
                  )}
                </div>

                <div className="user-info">
                  <h4>{u.name}</h4>
                  <p>{u.email}</p>
                </div>

                <span
                  className={`role ${
                    u.role === "admin"
                      ? "admin"
                      : ""
                  }`}
                >
                  {u.role}
                </span>

                <div className="actions">

                  <button
                    onClick={() =>
                      toggleRole.mutate(
                        u._id
                      )
                    }
                  >
                    {u.role === "admin" ? (
                      <Shield size={14} />
                    ) : (
                      <ShieldCheck
                        size={14}
                      />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      deleteUser.mutate(
                        u._id
                      )
                    }
                  >
                    <Trash2 size={14} />
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}