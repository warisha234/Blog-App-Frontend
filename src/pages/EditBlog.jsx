import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { X, ImagePlus } from 'lucide-react';
import './EditBlog.css';

const CATEGORIES = ['Sleep', 'Stress', 'Mindfulness', 'Relationships', 'Burnout', 'Emotions', 'Health'];

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const { data: blog } = useQuery({
    queryKey: ['blog-edit', id],
    queryFn: async () => {
      const { data } = await api.get(`/blogs/${id}`);
      return data;
    },
  });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        category: blog.category,
        excerpt: blog.excerpt,
        readTime: blog.readTime,
        tags: blog.tags?.join(', ')
      });
      setContent(blog.content);
      setPreview(blog.image || '');
    }
  }, [blog]);

  const onSubmit = async (data) => {
    try {
      const fd = new FormData();

      Object.entries(data).forEach(([k, v]) => {
        if (k === 'tags') {
          fd.append(k, JSON.stringify(v.split(',').map(t => t.trim())));
        } else {
          fd.append(k, v);
        }
      });

      fd.append('content', content);
      if (image) fd.append('image', image);

      const { data: updated } = await api.put(`/blogs/${id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Blog updated!');
      navigate(`/blogs/${updated._id}`);

    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div className="edit-page">

      <div className="edit-container">

        <div className="edit-header">
          <h1>Edit Article</h1>
          <p>Update your blog content and publish changes</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">

          {/* BASIC INFO */}
          <div className="card">
            <div className="grid-2">

              <div className="field">
                <label>Title</label>
                <input {...register('title')} />
              </div>

              <div className="field">
                <label>Category</label>
                <select {...register('category')}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="field">
                <label>Read Time</label>
                <input type="number" {...register('readTime')} />
              </div>

              <div className="field">
                <label>Tags</label>
                <input {...register('tags')} />
              </div>

            </div>

            <div className="field full">
              <label>Excerpt</label>
              <textarea {...register('excerpt')} />
            </div>
          </div>

          {/* IMAGE */}
          <div className="card">

            <label className="section-title">Cover Image</label>

            {preview ? (
              <div className="image-preview">
                <img src={preview} alt="preview" />
                <button type="button" onClick={() => { setImage(null); setPreview(''); }}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="upload-box">
                <ImagePlus />
                <p>Upload cover image</p>
                <input type="file" hidden
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </label>
            )}

          </div>

          {/* CONTENT */}
          <div className="card">
            <label className="section-title">Content</label>
            <div className="editor">
              <ReactQuill value={content} onChange={setContent} />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="actions">
            <button type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}