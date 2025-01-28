import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { ToastContainer, toast } from "react-toastify";
// import img from require("../../public/img/logo.svg")

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
    <div className="container py-4 ">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fs-4">Blog Management</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Post Blog
        </button>
      </div>

      <hr></hr>

      {/* Blog Cards Section */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {blogs.length === 0 ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center w-100"
            style={{ height: "50vh" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none">
              <ellipse opacity="0.1" cx="90" cy="174.6" rx="90" ry="5.4" fill="#7C7B91" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M35.5427 29.5585C34.3361 27.2339 31.4735 26.3276 29.149 27.5342C26.8244 28.7408 25.9181 31.6034 27.1247 33.928L31.6191 42.5867C32.8257 44.9113 35.6882 45.8176 38.0128 44.611C40.3374 43.4044 41.2437 40.5418 40.0371 38.2172L35.5427 29.5585ZM30.8075 30.7294C31.3674 30.4388 32.0569 30.6571 32.3475 31.217L36.8419 39.8757C37.1325 40.4357 36.9142 41.1252 36.3543 41.4158C35.7944 41.7064 35.1049 41.4881 34.8143 40.9282L30.3199 32.2695C30.0293 31.7096 30.2475 31.02 30.8075 30.7294ZM47.4521 50.2559C41.4875 50.2559 36.6521 55.0913 36.6521 61.0559V136.842C36.6521 142.807 41.4875 147.642 47.4521 147.642H119.452C125.417 147.642 130.252 142.807 130.252 136.842V125.153C122.72 120.796 117.652 112.652 117.652 103.324C117.652 93.9967 122.72 85.8528 130.252 81.4956V61.0559C130.252 55.0912 125.417 50.2559 119.452 50.2559H112.066V52.9863C112.066 57.9569 108.037 61.9863 103.066 61.9863H67.4385C62.4679 61.9863 58.4385 57.9569 58.4385 52.9863V50.2559H47.4521ZM133.852 79.7789V61.0559C133.852 53.103 127.405 46.6559 119.452 46.6559H95.7923C94.5698 41.977 90.3142 38.5243 85.2523 38.5243C80.1903 38.5243 75.9347 41.977 74.7122 46.6559H47.4521C39.4992 46.6559 33.0521 53.103 33.0521 61.0559V136.842C33.0521 144.795 39.4992 151.242 47.4521 151.242H119.452C127.405 151.242 133.852 144.795 133.852 136.842V126.87C136.647 127.939 139.681 128.524 142.852 128.524C156.77 128.524 168.052 117.242 168.052 103.324C168.052 89.4067 156.77 78.1243 142.852 78.1243C139.681 78.1243 136.647 78.7099 133.852 79.7789ZM13.1016 43.7044C14.273 41.3619 17.1216 40.4126 19.4641 41.584L28.1897 45.9473C30.5322 47.1187 31.4815 49.9673 30.3101 52.3098C29.1387 54.6523 26.2901 55.6017 23.9476 54.4303L15.2221 50.067C12.8796 48.8955 11.9302 46.047 13.1016 43.7044ZM17.854 44.8038C17.2898 44.5217 16.6036 44.7503 16.3215 45.3146C16.0393 45.8788 16.268 46.565 16.8322 46.8471L25.5577 51.2104C26.122 51.4926 26.8081 51.2639 27.0903 50.6997C27.3724 50.1354 27.1438 49.4493 26.5795 49.1671L17.854 44.8038ZM75.0726 86.4721C75.0726 83.9868 77.0874 81.9721 79.5726 81.9721H110.173C112.658 81.9721 114.673 83.9868 114.673 86.4721C114.673 88.9574 112.658 90.9721 110.173 90.9721H79.5726C77.0874 90.9721 75.0726 88.9574 75.0726 86.4721ZM79.5726 103.045C77.0874 103.045 75.0726 105.06 75.0726 107.545C75.0726 110.03 77.0874 112.045 79.5726 112.045H110.173C112.658 112.045 114.673 110.03 114.673 107.545C114.673 105.06 112.658 103.045 110.173 103.045H79.5726ZM78.6726 107.545C78.6726 107.048 79.0756 106.645 79.5726 106.645H110.173C110.67 106.645 111.073 107.048 111.073 107.545C111.073 108.042 110.67 108.445 110.173 108.445H79.5726C79.0756 108.445 78.6726 108.042 78.6726 107.545ZM75.0726 129.579C75.0726 127.094 77.0874 125.079 79.5726 125.079H110.173C112.658 125.079 114.673 127.094 114.673 129.579C114.673 132.064 112.658 134.079 110.173 134.079H79.5726C77.0874 134.079 75.0726 132.064 75.0726 129.579ZM79.5726 128.679C79.0756 128.679 78.6726 129.082 78.6726 129.579C78.6726 130.076 79.0756 130.479 79.5726 130.479H110.173C110.67 130.479 111.073 130.076 111.073 129.579C111.073 129.082 110.67 128.679 110.173 128.679H79.5726ZM54.9615 84.8585C54.9615 81.8761 57.3792 79.4585 60.3615 79.4585H63.2167C66.199 79.4585 68.6167 81.8761 68.6167 84.8585V87.7136C68.6167 90.696 66.199 93.1136 63.2167 93.1136H60.3615C57.3792 93.1136 54.9615 90.696 54.9615 87.7136V84.8585ZM60.3615 100.531C57.3792 100.531 54.9615 102.949 54.9615 105.931V108.786C54.9615 111.769 57.3792 114.186 60.3615 114.186H63.2167C66.199 114.186 68.6167 111.769 68.6167 108.786V105.931C68.6167 102.949 66.199 100.531 63.2167 100.531H60.3615ZM58.5615 105.931C58.5615 104.937 59.3674 104.131 60.3615 104.131H63.2167C64.2108 104.131 65.0167 104.937 65.0167 105.931V108.786C65.0167 109.78 64.2108 110.586 63.2167 110.586H60.3615C59.3674 110.586 58.5615 109.78 58.5615 108.786V105.931ZM54.9615 127.965C54.9615 124.983 57.3792 122.565 60.3615 122.565H63.2167C66.199 122.565 68.6167 124.983 68.6167 127.965V130.82C68.6167 133.803 66.199 136.22 63.2167 136.22H60.3615C57.3792 136.22 54.9615 133.803 54.9615 130.82V127.965ZM60.3615 126.165C59.3674 126.165 58.5615 126.971 58.5615 127.965V130.82C58.5615 131.815 59.3674 132.62 60.3615 132.62H63.2167C64.2108 132.62 65.0167 131.815 65.0167 130.82V127.965C65.0167 126.971 64.2108 126.165 63.2167 126.165H60.3615ZM121.252 103.324C121.252 91.3949 130.923 81.7243 142.852 81.7243C154.781 81.7243 164.452 91.3949 164.452 103.324C164.452 115.254 154.781 124.924 142.852 124.924C130.923 124.924 121.252 115.254 121.252 103.324ZM138.352 91.6243C138.352 89.139 140.367 87.1243 142.852 87.1243C145.337 87.1243 147.352 89.139 147.352 91.6243V102.424C147.352 104.91 145.337 106.924 142.852 106.924C140.367 106.924 138.352 104.91 138.352 102.424V91.6243ZM142.852 90.7243C142.355 90.7243 141.952 91.1272 141.952 91.6243V102.424C141.952 102.921 142.355 103.324 142.852 103.324C143.349 103.324 143.752 102.921 143.752 102.424V91.6243C143.752 91.1272 143.349 90.7243 142.852 90.7243ZM142.852 119.524C140.367 119.524 138.352 117.51 138.352 115.024C138.352 112.539 140.367 110.524 142.852 110.524C145.337 110.524 147.352 112.539 147.352 115.024C147.352 117.51 145.337 119.524 142.852 119.524ZM141.952 115.024C141.952 115.521 142.355 115.924 142.852 115.924C143.349 115.924 143.752 115.521 143.752 115.024C143.752 114.527 143.349 114.124 142.852 114.124C142.355 114.124 141.952 114.527 141.952 115.024Z" fill="#7C7B91" />
            </svg>
            <p className="text-muted text-center">No blogs posted yet!</p>
          </div>

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
                    className="btn btn-primary w-50 me-2"
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
                    className={`form-control ${errors.seoDescription ? "is-invalid" : ""
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
