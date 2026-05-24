import { useState } from 'react';
import { Heart } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './LikeButton.css';

export default function LikeButton({ blogId, initialCount = 0, initialLiked = false }) {
  const { user } = useAuth();

  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (!user) return toast.error('Login to like posts');
    if (loading) return;

    setLoading(true);

    try {
      const { data } = await api.post(`/likes/${blogId}`);

      setLiked(data.liked);
      setCount(data.count);

    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`like-btn ${liked ? 'liked' : ''}`}
    >
      <Heart size={16} fill={liked ? '#dfff00' : 'none'} />
      <span>
        {count} {count === 1 ? 'Like' : 'Likes'}
      </span>
    </button>
  );
}