import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import mammoth from "mammoth";
import "react-toastify/dist/ReactToastify.css";

const BlogHandlingPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  const [formData, setFormData] = useState({
    heading: "",
    sub_heading: "",
    feature_image: null,
    image_alt_text: "",
    seo_title: "",
    meta_description: "",
    full_description: "",
    tags: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.admin.pixeladvant.com/api/blog_details/");
      setBlogs(res.data);
    } catch (err) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      heading: "",
      sub_heading: "",
      feature_image: null,
      image_alt_text: "",
      seo_title: "",
      meta_description: "",
      full_description: "",
      tags: "",
    });
    setEditingBlog(null);
  };

  const openEditModal = (blog) => {
    setFormData({
      heading: blog.heading || "",
      sub_heading: blog.sub_heading || "",
      feature_image: null,
      image_alt_text: blog.image_alt_text || "",
      seo_title: blog.seo_title || "",
      meta_description: blog.meta_description || "",
      full_description: blog.full_description || "",
      tags: blog.tags || "",
    });
    setEditingBlog(blog.id);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, full_description: value });
  };

  const handleDocxUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".docx")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        mammoth.convertToHtml({ arrayBuffer }).then((result) => {
          handleQuillChange(result.value);
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error("Please upload a valid .docx file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.heading || !formData.full_description) {
      toast.error("Heading and Description are required.");
      return;
    }

    setSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "feature_image") {
        // Always append it, even if null (empty string trick)
        if (value instanceof File) {
          data.append("feature_image", value);
        } else if (!editingBlog) {
          // only on create, make it required
          toast.error("Feature image is required for new blogs.");
          setSubmitting(false);
          return;
        } else {
          // on edit and no file selected, send empty string or skip based on backend
          data.append("feature_image", "");
        }
      } else {
        data.append(key, value);
      }
    });
    

    try {
      const url = editingBlog
        ? `https://api.admin.pixeladvant.com/api/blog_details/${editingBlog}/`
        : "https://api.admin.pixeladvant.com/api/blog_details/";
      const method = editingBlog ? "put" : "post";

      await axios({ method, url, data });

      toast.success(editingBlog ? "Blog updated!" : "Blog published!");
      resetForm();
      fetchBlogs();
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to submit blog");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const id = deleteModal.id;
    try {
      await axios.delete(`https://api.admin.pixeladvant.com/api/blog_details/${id}/`);
      toast.success("Blog deleted");
      setDeleteModal({ show: false, id: null });
      fetchBlogs();
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Blogs</h2>
        <Button  className=" postbutton " onClick={() => { resetForm(); setShowModal(true); }}>
          + Post New Blog
        </Button>
      </div>
      <hr />

      {loading ? (
        <div className="text-center">Loading blogs...</div>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog.id}>
              <div className="card h-100 shadow-sm bg-light p-2">
                <img
                  src={blog.feature_image || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={blog.image_alt_text || "Blog Image"}
                  className="card-img-top border"
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{blog.heading}</h5>
                  <p className="card-text text-muted">{blog.sub_heading}</p>
                  <Link to={`/blog/${blog.id}`} className="btn btn-outline-primary mt-auto">View Details</Link>
                </div>
                <div className="card-footer gap-3 d-flex justify-content-between">
                  <Button size="sm" className="w-100" variant="success" onClick={() => openEditModal(blog)}>Edit</Button>
                  <Button size="sm" className="w-100" variant="danger" onClick={() => setDeleteModal({ show: true, id: blog.id })}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  size="lg"
  scrollable
>
  <Modal.Header closeButton>
    <Modal.Title>{editingBlog ? "Edit Blog" : "Add Blog"}</Modal.Title>
  </Modal.Header>
  <Form onSubmit={handleSubmit}>
    <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
      <Form.Control type="text" name="heading" placeholder="Heading" value={formData.heading} onChange={handleInputChange} className="mb-2" required />
      <Form.Control type="text" name="sub_heading" placeholder="Sub Heading" value={formData.sub_heading} onChange={handleInputChange} className="mb-2" />
      <Form.Control type="file" name="feature_image" accept="image/*" onChange={handleInputChange} className="mb-2" />
      <Form.Control type="text" name="image_alt_text" placeholder="Image Alt Text" value={formData.image_alt_text} onChange={handleInputChange} className="mb-2" />
      <Form.Control type="text" name="seo_title" placeholder="SEO Title" value={formData.seo_title} onChange={handleInputChange} className="mb-2" />
      <Form.Control type="text" name="meta_description" placeholder="Meta Description" value={formData.meta_description} onChange={handleInputChange} className="mb-2" />
      <Form.Label>Full Description</Form.Label>
      <ReactQuill value={formData.full_description} onChange={handleQuillChange} className="mb-3" />
      <Form.Control type="file" accept=".docx" onChange={handleDocxUpload} className="mb-2" />
      <Form.Control type="text" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleInputChange} className="mb-2" />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
      <Button variant="primary" type="submit" disabled={submitting}>
        {submitting ? <Spinner animation="border" size="sm" /> : editingBlog ? "Update Blog" : "Publish Blog"}
      </Button>
    </Modal.Footer>
  </Form>
</Modal>


      {/* Delete Confirm Modal */}
      <Modal show={deleteModal.show} onHide={() => setDeleteModal({ show: false, id: null })}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal({ show: false, id: null })}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogHandlingPage;
