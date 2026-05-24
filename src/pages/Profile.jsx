import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Camera, FileText } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      name: user?.name,
      bio: user?.bio
    }
  });

  const { data: myBlogs } = useQuery({
    queryKey: ['my-blogs'],
    queryFn: async () => {
      const { data } = await api.get('/blogs/my-blogs');
      return data;
    },
  });

  const onAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      fd.append('name', data.name);
      fd.append('bio', data.bio || '');
      if (avatarFile) fd.append('avatar', avatarFile);

      const { data: updated } = await api.put(
        '/users/profile',
        fd,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      updateUser(updated);
      toast.success('Profile updated!');
      setIsEditing(false);

    } catch {
      toast.error('Update failed');
    }
  };

  const cancelEdit = () => {
    reset({
      name: user?.name,
      bio: user?.bio
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">

      <h1 className="profile-title">Profile</h1>

      <div className="profile-grid">

        {/* LEFT CARD */}
        <div className="profile-card">

          {/* HEADER */}
          <div className="profile-header">

            <div className="avatar-box">
              {avatarPreview ? (
                <img src={avatarPreview} alt="" />
              ) : (
                <div className="avatar-fallback">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <label className="camera-btn">
                <Camera size={14} />
                <input type="file" hidden onChange={onAvatar} />
              </label>
            </div>

            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>

            <span className={`role ${user?.role}`}>
              {user?.role}
            </span>

            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              ✨ Edit Profile
            </button>
          </div>

          {/* VIEW MODE */}
          {!isEditing && (
            <div className="profile-view">

              <div className="info-card">
                <span>Name</span>
                <p>{user?.name}</p>
              </div>

              <div className="info-card">
                <span>Bio</span>
                <p>{user?.bio || "No bio added yet"}</p>
              </div>

              <div className="info-card">
                <span>Email</span>
                <p>{user?.email}</p>
              </div>

            </div>
          )}

          {/* EDIT MODE */}
          {isEditing && (
            <form onSubmit={handleSubmit(onSubmit)} className="profile-form premium-form">

              <label>Name</label>
              <input {...register('name')} placeholder="Enter your name" />

              <label>Bio</label>
              <textarea {...register('bio')} rows="4" placeholder="Write something about yourself..." />

              <div className="btn-row">

                <button type="submit" disabled={isSubmitting} className="save-btn">
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>

              </div>

            </form>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="blogs-section">

          <div className="blogs-header">
            <h2>
              <FileText size={18} />
              My Articles ({myBlogs?.length || 0})
            </h2>

            <Link to="/blogs/create">Write  Blogs</Link>
          </div>

          <div className="blogs-grid">

            {myBlogs?.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}

            {myBlogs?.length === 0 && (
              <div className="empty">
                No articles yet
                <Link to="/blogs/create">Create one</Link>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}