import { Link } from 'react-router-dom';
import { Clock, Heart, Eye } from 'lucide-react';
import './BlogCard.css';

const categoryColors = {
  Sleep: 'sleep',
  Stress: 'stress',
  Mindfulness: 'mindfulness',
  Relationships: 'relationships',
  Burnout: 'burnout',
  Emotions: 'emotions',
  Health: 'health',
  default: 'default',
};

export default function BlogCard({ blog }) {
  const colorClass =
    categoryColors[blog.category] || categoryColors.default;

  const initials = blog.author?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link to={`/blogs/${blog._id}`} className="blog-card">

      {/* IMAGE SECTION */}
      <div className="blog-image">

        {blog.image ? (
          <img src={blog.image} alt={blog.title} />
        ) : (
          <div className="blog-placeholder">🧠</div>
        )}

        <span className={`blog-category ${colorClass}`}>
          {blog.category}
        </span>

      </div>

      {/* CONTENT */}
      <div className="blog-content">

        <div className="meta">
          <Clock size={12} />
          <span>{blog.readTime} mins read</span>
        </div>

        <h3 className="title">{blog.title}</h3>

        {blog.excerpt && (
          <p className="excerpt">{blog.excerpt}</p>
        )}

        {/* FOOTER */}
        <div className="footer">

          {blog.author?.avatar ? (
            <img
              src={blog.author.avatar}
              className="avatar"
              alt={blog.author.name}
            />
          ) : (
            <div className="avatar-fallback">
              {initials}
            </div>
          )}

          <div className="author">
            <p className="name">{blog.author?.name}</p>
            <p className="date">
              {new Date(blog.createdAt).toLocaleDateString(
                'en-US',
                { month: 'short', day: 'numeric' }
              )}
            </p>
          </div>

          <div className="stats">
            <span>
              <Eye size={20} /> {blog.views || 0}
            </span>
            <span>
              <Heart size={20} />
            </span>
          </div>

        </div>

      </div>
    </Link>
  );
}