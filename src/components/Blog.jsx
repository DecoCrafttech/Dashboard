import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const BlogHandlingPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [blogInput, setBlogInput] = useState({
    heading: "",
    subHeading: "",
    imageUrl: "",
    imageAlt: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
  });

  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setBlogInput({
      heading: "",
      subHeading: "",
      imageUrl: "",
      imageAlt: "",
      content: "",
      seoTitle: "",
      seoDescription: "",
    });
    setEditIndex(null);
    setShowModal(false);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!blogInput.heading.trim()) newErrors.heading = "Heading is required.";
    if (!blogInput.content.trim()) newErrors.content = "Content is required.";
    if (!blogInput.seoTitle.trim()) newErrors.seoTitle = "SEO title is required.";
    if (!blogInput.seoDescription.trim()) newErrors.seoDescription = "SEO description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveBlog = () => {
    if (!validate()) return;
    const updatedBlogs = [...blogs];
    if (editIndex !== null) {
      updatedBlogs[editIndex] = blogInput;
      toast.success("Blog updated successfully!");
    } else {
      updatedBlogs.push(blogInput);
      toast.success("Blog posted successfully!");
    }
    setBlogs(updatedBlogs);
    resetForm();
  };

  const handleEditBlog = (index) => {
    setEditIndex(index);
    setBlogInput(blogs[index]);
    setShowModal(true);
  };

  const handleDeleteBlog = (index) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const updatedBlogs = blogs.filter((_, i) => i !== index);
      setBlogs(updatedBlogs);
      toast.success("Blog deleted successfully!");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Blogs</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Post New Blog
        </button>
      </div>

      <hr />  

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editIndex !== null ? "Edit Blog" : "Post Blog"}</h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Heading *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.heading ? "is-invalid" : ""}`}
                    value={blogInput.heading}
                    onChange={(e) => setBlogInput({ ...blogInput, heading: e.target.value })}
                  />
                  {errors.heading && <div className="invalid-feedback">{errors.heading}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Sub Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogInput.subHeading}
                    onChange={(e) => setBlogInput({ ...blogInput, subHeading: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogInput.imageUrl}
                    onChange={(e) => setBlogInput({ ...blogInput, imageUrl: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image Alt Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={blogInput.imageAlt}
                    onChange={(e) => setBlogInput({ ...blogInput, imageAlt: e.target.value })}
                  />
                </div>
                

                <div className="mb-3">
                  <label className="form-label">SEO Title *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.seoTitle ? "is-invalid" : ""}`}
                    value={blogInput.seoTitle}
                    onChange={(e) => setBlogInput({ ...blogInput, seoTitle: e.target.value })}
                  />
                  {errors.seoTitle && <div className="invalid-feedback">{errors.seoTitle}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">SEO Description *</label>
                  <textarea
                    className={`form-control ${errors.seoDescription ? "is-invalid" : ""}`}
                    value={blogInput.seoDescription}
                    onChange={(e) => setBlogInput({ ...blogInput, seoDescription: e.target.value })}
                    rows={3}
                  />
                  {errors.seoDescription && <div className="invalid-feedback">{errors.seoDescription}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="button" className="btn btn-success" onClick={handleSaveBlog}>
                  {editIndex !== null ? "Update" : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {blogs.map((blog, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm">
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.imageAlt || blog.heading}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{blog.heading}</h5>
                <p className="card-text">{blog.subHeading}</p>
                <div
                  className="blog-content-preview"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.slice(0, 100) + "...",
                  }}
                />
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEditBlog(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteBlog(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHandlingPage;