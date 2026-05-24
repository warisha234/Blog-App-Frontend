import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import api from "../api/axios";
import toast from "react-hot-toast";
import './CreateBlog.css';

import {
  ImagePlus,
  X,
  Sparkles,
  PenSquare,
  Clock3,
  Tag,
  Layers3,
  ArrowLeft,
  Send,
  Crown,
} from "lucide-react";

import "./CreateBlog.css";

const CATEGORIES = [
  "Technology",
  "Lifestyle",
  "Business",
  "Travel",
  "Health",
  "Education",
  "Food",
];

export default function CreateBlog() {

  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onImage = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImage(file);
      setPreview(URL.createObjectURL(file));

    }

  };

  const onSubmit = async (data) => {

    if (!content.trim()) {
      return toast.error("Content is required");
    }

    try {

      const fd = new FormData();

      fd.append("title", data.title);
      fd.append("content", content);
      fd.append("excerpt", data.excerpt);
      fd.append("category", data.category);
      fd.append("readTime", data.readTime || 5);

      fd.append(
        "tags",
        JSON.stringify(
          data.tags
            ? data.tags.split(",").map((t) => t.trim())
            : []
        )
      );

      if (image) {
        fd.append("image", image);
      }

      const { data: blog } = await api.post(
        "/blogs",
        fd,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success("Blog Published!");

      navigate(`/blogs/${blog._id}`);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to publish"
      );

    }

  };

  return (

    <div className="create-blog-page">

      {/* GLOW */}
      <div className="blog-glow glow-one"></div>
      <div className="blog-glow glow-two"></div>

      <div className="create-blog-container">

        {/* TOP */}
        <div className="blog-top">

          <div>

            <div className="blog-tag">
              <Sparkles size={14} />
              Premium Blog Editor
            </div>

            <h1>
              Create Your <span>Next Story.</span>
            </h1>

            <p>
              Share ideas, experiences and
              creativity beautifully with the world.
            </p>

          </div>

          <div className="top-badge">

            <div className="badge-icon">
              <Crown size={22} />
            </div>

            <div>
              <h3>Professional Writing</h3>
              <span>
                Beautiful publishing experience
              </span>
            </div>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="blog-form"
        >

          {/* LEFT */}
          <div className="blog-left">

            {/* BASIC INFO */}
            <div className="blog-card">

              <div className="card-heading">

                <div className="heading-icon">
                  <PenSquare size={20} />
                </div>

                <div>
                  <h2>Blog Details</h2>
                  <p>
                    Write article information
                  </p>
                </div>

              </div>

              {/* TITLE */}
              <div className="input-box">

                <label>Title *</label>

                <input
                  {...register("title", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Write an amazing title..."
                />

              </div>

              {/* GRID */}
              <div className="grid-two">

                {/* CATEGORY */}
                <div className="input-box">

                  <label>
                    <Layers3 size={15} />
                    Category
                  </label>

                  <select
                    {...register("category", {
                      required: true,
                    })}
                  >

                    <option value="">
                      Select category
                    </option>

                    {CATEGORIES.map((c) => (
                      <option
                        key={c}
                        value={c}
                      >
                        {c}
                      </option>
                    ))}

                  </select>

                </div>

                {/* READTIME */}
                <div className="input-box">

                  <label>
                    <Clock3 size={15} />
                    Read Time
                  </label>

                  <input
                    {...register("readTime")}
                    type="number"
                    defaultValue={5}
                    min={1}
                  />

                </div>

              </div>

              {/* EXCERPT */}
              <div className="input-box">

                <label>Excerpt</label>

                <textarea
                  {...register("excerpt")}
                  rows={3}
                  placeholder="Small description about your blog..."
                />

              </div>

              {/* TAGS */}
              <div className="input-box">

                <label>
                  <Tag size={15} />
                  Tags
                </label>

                <input
                  {...register("tags")}
                  type="text"
                  placeholder="design, coding, lifestyle"
                />

              </div>

            </div>

            {/* EDITOR */}
            <div className="blog-card">

              <div className="card-heading">

                <div className="heading-icon">
                  <PenSquare size={20} />
                </div>

                <div>
                  <h2>Write Content</h2>
                  <p>
                    Share your creativity
                  </p>
                </div>

              </div>

              <ReactQuill
                value={content}
                onChange={setContent}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"],
                    [{ header: [2, 3, false] }],
                    ["blockquote", "code-block"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                    ],
                    ["link"],
                    ["clean"],
                  ],
                }}
                className="custom-editor"
              />

            </div>

          </div>

          {/* RIGHT */}
          <div className="blog-right">

            {/* IMAGE */}
            <div className="blog-card">

              <div className="card-heading">

                <div className="heading-icon">
                  <ImagePlus size={20} />
                </div>

                <div>
                  <h2>Cover Image</h2>
                  <p>
                    Upload attractive thumbnail
                  </p>
                </div>

              </div>

              {preview ? (

                <div className="preview-box">

                  <img
                    src={preview}
                    alt="preview"
                  />

                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => {
                      setImage(null);
                      setPreview("");
                    }}
                  >

                    <X size={15} />

                  </button>

                </div>

              ) : (

                <label className="upload-box">

                  <ImagePlus size={34} />

                  <h3>
                    Upload Cover
                  </h3>

                  <p>
                    PNG, JPG or WEBP
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImage}
                    hidden
                  />

                </label>

              )}

            </div>

            {/* TIPS */}
            <div className="blog-card">

              <div className="tips-box">

                <h3>
                  Writing Tips ✨
                </h3>

                <ul>
                  <li>
                    Use clear headings
                  </li>

                  <li>
                    Keep paragraphs short
                  </li>

                  <li>
                    Add attractive images
                  </li>

                  <li>
                    Use engaging titles
                  </li>
                </ul>

              </div>

            </div>

            {/* BUTTONS */}
            <div className="action-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(-1)}
              >

                <ArrowLeft size={17} />
                Cancel

              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="publish-btn"
              >

                {isSubmitting ? (
                  "Publishing..."
                ) : (
                  <>
                    Publish
                    <Send size={16} />
                  </>
                )}

              </button>

            </div>

          </div>

        </form>

      </div>

    </div>

  );

}