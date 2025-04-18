import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_URL = "https://api.admin.pixeladvant.com/api/post_jobs/";

const stripHtml = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};


const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    location: "",
    job_description: "",
    requirements: "",
    salary: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(API_URL);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch jobs.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingJob) {
        await axios.patch(`${API_URL}${editingJob.id}/`, formData);
        toast.success("Job updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Job posted successfully!");
      }

      fetchJobs();
      setShowModal(false);
      setEditingJob(null);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save job.");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({ ...job });
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}${jobToDelete.id}/`);
      toast.success("Job deleted.");
      setShowDeleteModal(false);
      fetchJobs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job.");
    }
  };

  const resetForm = () => {
    setFormData({
      job_title: "",
      company: "",
      location: "",
      job_description: "",
      requirements: "",
      salary: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>Job Listings</h2>
        <Button
          className="postbutton"
          onClick={() => {
            setEditingJob(null);
            resetForm();
            setShowModal(true);
          }}
        >
          + Add Job
        </Button>
      </div>
      <hr />

      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-4 mb-4" key={job.id}>
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title bg-success rounded text-white p-3">{job.job_title}</h5>
              </div>
              <div className="card-body">
                <h6>{job.company} - <strong>{job.location}</strong></h6>
                <h6>₹ {job.salary}</h6>
                <p className="card-text">
                  {stripHtml(job.job_description).length > 80
                    ? `${stripHtml(job.job_description).slice(0, 80)}...`
                    : stripHtml(job.job_description)}
                </p>

              </div>
              <div className="card-footer">
                <div className="row g-2">
                  <div className="col-12">
                    <Button size="sm" variant="outline-primary" className="w-100"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowDetailsModal(true);
                      }}>
                      View Details
                    </Button>
                  </div>
                  <div className="col">
                    <Button size="sm" variant="success" className="w-100"
                      onClick={() => handleEdit(job)}>
                      Edit
                    </Button>
                  </div>
                  <div className="col">
                    <Button size="sm" variant="danger" className="w-100"
                      onClick={() => {
                        setJobToDelete(job);
                        setShowDeleteModal(true);
                      }}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingJob ? "Edit Job" : "Add Job"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                value={formData.job_description}
                onChange={(value) => setFormData((prev) => ({ ...prev, job_description: value }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Requirements</Form.Label>
              <ReactQuill
                value={formData.requirements}
                onChange={(value) => setFormData((prev) => ({ ...prev, requirements: value }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">{editingJob ? "Update" : "Save"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{jobToDelete?.job_title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* View Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.job_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Company:</strong> {selectedJob?.company}</p>
          <p><strong>Location:</strong> {selectedJob?.location}</p>
          <p><strong>Salary:</strong> ₹{selectedJob?.salary}</p>
          <hr />
          <div><strong>Description:</strong></div>
          <div dangerouslySetInnerHTML={{ __html: selectedJob?.job_description }} />
          <hr />
          <div><strong>Requirements:</strong></div>
          <div dangerouslySetInnerHTML={{ __html: selectedJob?.requirements }} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobPage;
