import { useState, useEffect } from 'react';
import { Send, Trash2, MessageCircle } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './CommentSection.css';

export default function CommentSection({ blogId }) {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    api.get(`/comments/${blogId}`).then(({ data }) => setComments(data));
  }, [blogId]);

  const submit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;
    if (!user) return toast.error('Login to comment');

    setLoading(true);

    try {
      const { data } = await api.post(`/comments/${blogId}`, {
        text,
        parentComment: replyTo
      });

      if (replyTo) {
        setComments(prev =>
          prev.map(c =>
            c._id === replyTo
              ? { ...c, replies: [...(c.replies || []), data] }
              : c
          )
        );
      } else {
        setComments(prev => [{ ...data, replies: [] }, ...prev]);
      }

      setText('');
      setReplyTo(null);

    } catch {
      toast.error('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id, parentId) => {
    try {
      await api.delete(`/comments/${id}`);

      if (parentId) {
        setComments(prev =>
          prev.map(c =>
            c._id === parentId
              ? { ...c, replies: c.replies.filter(r => r._id !== id) }
              : c
          )
        );
      } else {
        setComments(prev => prev.filter(c => c._id !== id));
      }

    } catch {
      toast.error('Failed to delete');
    }
  };

  const CommentItem = ({ comment, isReply, parentId }) => (
    <div className={`comment-item ${isReply ? 'reply' : ''}`}>

      <div className="avatar">
        {comment.user?.avatar ? (
          <img src={comment.user.avatar} alt="" />
        ) : (
          <span>{comment.user?.name?.charAt(0)}</span>
        )}
      </div>

      <div className="comment-box">

        <div className="comment-header">
          <span className="name">{comment.user?.name}</span>

          <div className="actions">
            <span className="date">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>

            {!isReply && user && (
              <button
                className="reply-btn"
                onClick={() => setReplyTo(comment._id)}
              >
                Reply
              </button>
            )}

            {user &&
              (user._id === comment.user?._id || user.role === 'admin') && (
                <button
                  className="delete-btn"
                  onClick={() => deleteComment(comment._id, parentId)}
                > Delete
                  <Trash2 size={14} />
                </button>
              )}
          </div>
        </div>

        <p className="text">{comment.text}</p>
      </div>

    </div>
  );

  return (
    <div className="comment-section">

      <h3 className="title">
        <MessageCircle size={20} />
        Comments ({comments.length})
      </h3>

      {user && (
        <form onSubmit={submit} className="comment-form">

          <div className="user-avatar">
            {user.name?.charAt(0)}
          </div>

          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={replyTo ? 'Write a reply...' : 'Write a comment...'}
          />

          {replyTo && (
            <button
              type="button"
              className="cancel"
              onClick={() => setReplyTo(null)}
            >
              Cancel
            </button>
          )}

          <button type="submit" disabled={loading} className="send-btn">
            <Send size={16} />
          </button>

        </form>
      )}

      <div className="comment-list">
        {comments.map(comment => (
          <div key={comment._id}>
            <CommentItem comment={comment} />

            {comment.replies?.map(reply => (
              <CommentItem
                key={reply._id}
                comment={reply}
                isReply
                parentId={comment._id}
              />
            ))}
          </div>
        ))}

        {comments.length === 0 && (
          <p className="empty">No comments yet. Be the first!</p>
        )}
      </div>

    </div>
  );
}