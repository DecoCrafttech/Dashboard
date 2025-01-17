import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { ToastContainer, toast } from "react-toastify";

const BlogHandlingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogInput, setBlogInput] = useState({
    heading: "",
    subHeading: "",
    imageUrl: "",
    imageAlt: "",
    content: "",
    seoTitle: "",
    seoDescription: "",
  });
  const [blogs, setBlogs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  // Validate blog input fields
  const validateBlogInput = () => {
    const errors = {};
    if (!blogInput.heading.trim()) errors.heading = "Heading is required.";
    if (!blogInput.content.trim()) errors.content = "Content is required.";
    if (!blogInput.seoTitle.trim()) errors.seoTitle = "SEO Title is required.";
    if (!blogInput.seoDescription.trim()) errors.seoDescription = "SEO Description is required.";
    return errors;
  };

  // Handle Add or Edit Blog
  const handleSaveBlog = () => {
    const validationErrors = validateBlogInput();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedBlogs = blogs.map((blog, index) =>
        index === editIndex ? blogInput : blog
      );
      setBlogs(updatedBlogs);
      toast.success("Blog updated successfully!");
    } else {
      setBlogs([...blogs, blogInput]);
      toast.success("Blog posted successfully!");
    }

    resetForm();
  };

  // Reset form after save or cancel
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
    setErrors({});
    setEditIndex(null);
    setShowModal(false);
  };

  // Handle Edit Blog
  const handleEditBlog = (index) => {
    setBlogInput(blogs[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  // Handle Delete Blog
  const handleDeleteBlog = (index) => {
    setBlogs(blogs.filter((_, i) => i !== index));
    toast.success("Blog deleted successfully!");
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Blog Management</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Post Blog
        </button>
      </div>

      {/* Blog Cards Section */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {blogs.length === 0 ? (
          <p className="text-center">No blogs posted yet!</p>
        ) : (
          blogs.map((blog, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.imageAlt || "Blog Image"}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{blog.heading}</h5>
                  <p className="card-text text-muted">{blog.subHeading}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-warning w-50 me-2"
                    onClick={() => handleEditBlog(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger w-50"
                    onClick={() => handleDeleteBlog(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Section */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editIndex !== null ? "Edit Blog" : "Create Blog"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetForm}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* {Object.keys(errors).length > 0 && (
                  <div className="alert alert-danger">
                    {Object.values(errors).map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )} */}

                <div className="mb-3">
                  <label htmlFor="heading" className="form-label">
                    Heading
                  </label>
                  <input
                    type="text"
                    id="heading"
                    className={`form-control ${errors.heading ? "is-invalid" : ""}`}
                    value={blogInput.heading}
                    onChange={(e) =>
                      setBlogInput({ ...blogInput, heading: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subHeading" className="form-label">
                    Subheading
                  </label>
                  <input
                    type="text"
                    id="subHeading"
                    className="form-control"
                    value={blogInput.subHeading}
                    onChange={(e) =>
                      setBlogInput({ ...blogInput, subHeading: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    className="form-control"
                    value={blogInput.imageUrl}
                    onChange={(e) =>
                      setBlogInput({ ...blogInput, imageUrl: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="imageAlt" className="form-label">
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    id="imageAlt"
                    className="form-control"
                    value={blogInput.imageAlt}
                    onChange={(e) =>
                      setBlogInput({ ...blogInput, imageAlt: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="seoTitle" className="form-label">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    id="seoTitle"
                    className={`form-control ${errors.seoTitle ? "is-invalid" : ""}`}
                    value={blogInput.seoTitle}
                    onChange={(e) =>
                      setBlogInput({ ...blogInput, seoTitle: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="seoDescription" className="form-label">
                    SEO Description
                  </label>
                  <textarea
                    id="seoDescription"
                    className={`form-control ${
                      errors.seoDescription ? "is-invalid" : ""
                    }`}
                    value={blogInput.seoDescription}
                    onChange={(e) =>
                      setBlogInput({ ...blogInput, seoDescription: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <ReactQuill
                    value={blogInput.content}
                    onChange={(value) =>
                      setBlogInput({ ...blogInput, content: value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveBlog}
                >
                  {editIndex !== null ? "Update Blog" : "Post Blog"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogHandlingPage;
