import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import LikeButton from "../components/LikeButton";
import CommentSection from "../components/CommentSection";

import {
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
  Eye,
  Sparkles,
} from "lucide-react";

import "./BlogDetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const { data } = await api.get(`/blogs/${id}`);
      return data;
    },
  });

  const { data: likes } = useQuery({
    queryKey: ["likes", id],
    queryFn: async () => {
      const { data } = await api.get(`/likes/${id}`);
      return data;
    },
    enabled: !!user,
  });

  const deleteBlog = async () => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading)
    return <div className="detail-skeleton"></div>;

  if (!blog)
    return (
      <div className="not-found">
        Blog not found
      </div>
    );

  const isAuthor =
    user?._id === blog.author?._id ||
    user?.id === blog.author?._id;

  return (
    <div className="blog-detail-page">

      {/* GLOW */}
      <div className="detail-glow one"></div>
      <div className="detail-glow two"></div>

      {/* BACK BAR */}
      <div className="top-bar">

        <button
          onClick={() => navigate("/blogs")}
          className="back-btn"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {(isAuthor ||
          user?.role === "admin") && (
          <div className="action-box">

            <Link
              to={`/blogs/${id}/edit`}
              className="edit-btn"
            >
              <Edit size={14} />
              Edit
            </Link>

            <button
              onClick={deleteBlog}
              className="delete-btn"
            >
              <Trash2 size={14} />
              Delete
            </button>

          </div>
        )}

      </div>

      {/* BLOG CARD */}
      <div className="detail-card">

        {blog.image && (
          <div className="image-wrapper">
            <img
              src={blog.image}
              alt={blog.title}
            />
          </div>
        )}

        <div className="detail-content">

          {/* META */}
          <div className="meta">

            <span className="cat">
              <Sparkles size={12} />
              {blog.category}
            </span>

            <span>
              <Clock size={12} />
              {blog.readTime} min read
            </span>

            <span>
              <Eye size={12} />
              {blog.views} views
            </span>

          </div>

          {/* TITLE */}
          <h1>
            {blog.title}
          </h1>

          {/* AUTHOR */}
          <div className="author-box">

            {blog.author?.avatar ? (
              <img
                src={blog.author.avatar}
                alt=""
              />
            ) : (
              <div className="avatar-fallback">
                {blog.author?.name?.charAt(
                  0
                )}
              </div>
            )}

            <div>
              <h4>
                {blog.author?.name}
              </h4>
              <p>
                {new Date(
                  blog.createdAt
                ).toDateString()}
              </p>
            </div>

            <div className="like-box">
              <LikeButton
                blogId={id}
                initialCount={
                  likes?.count || 0
                }
                initialLiked={
                  likes?.userLiked ||
                  false
                }
              />
            </div>

          </div>

          {/* CONTENT */}
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />

          {/* TAGS */}
          {blog.tags?.length > 0 && (
            <div className="tags">

              {blog.tags.map((tag) => (
                <span key={tag}>
                  #{tag}
                </span>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* COMMENTS */}
      <div className="comment-box">
        <CommentSection blogId={id} />
      </div>

    </div>
  );
}