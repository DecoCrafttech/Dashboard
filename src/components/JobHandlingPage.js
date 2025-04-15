import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const API_URL = "https://api.admin.pixeladvant.com/api/post_jobs/";

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

  const fetchJobs = async () => {
    try {
      const res = await axios.get(API_URL);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch jobs.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      job_title: formData.job_title,
      company: formData.company,
      location: formData.location,
      job_description: formData.job_description,
      requirements: formData.requirements,
      salary: formData.salary,
    };

    try {
      if (editingJob) {
        await axios.patch(`${API_URL}${editingJob.id}/`, payload);
        toast.success("Job updated successfully!");
      } else {
        await axios.post(API_URL, payload);
        toast.success("Job posted successfully!");
      }

      fetchJobs();
      setShowModal(false);
      setEditingJob(null);
      setFormData({
        job_title: "",
        company: "",
        location: "",
        job_description: "",
        requirements: "",
        salary: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save job.");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      job_title: job.job_title,
      company: job.company,
      location: job.location,
      job_description: job.job_description,
      requirements: job.requirements,
      salary: job.salary,
    });
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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>Job Listings</h2>
        <Button onClick={() => {
          setEditingJob(null);
          setFormData({
            job_title: "",
            company: "",
            location: "",
            job_description: "",
            requirements: "",
            salary: "",
          });
          setShowModal(true);
        }}>
          + Add Job
        </Button>
      </div>
      <hr />

      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-4 mb-4" key={job.id}>
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title m-0 p-3 bg-success rounded text-white py-3 my-2 ">{job.job_title}</h5>

              </div>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 ">{job.company} - <strong>{job.location}</strong></h6>
                {/* <h6 className="card-title mb-2 ">{job.location}</h6>               */}
                <h6 className="card-title">₹ {job.salary}</h6>
                <p className="card-text">
                  {job.job_description.length > 80
                    ? `${job.job_description.slice(0, 80)}...`
                    : job.job_description}
                </p>
              </div>
              {/* <div className="card-footer justify-content-between d-flex  d-grid gap-2">
                <Button  variant="outline-primary" onClick={() => {
                  setSelectedJob(job);
                  setShowDetailsModal(true);
                }}>
                  View Details
                </Button>
                <Button  variant="success" onClick={() => handleEdit(job)}>
                  Edit
                </Button>
                <Button  variant="danger" onClick={() => {
                  setJobToDelete(job);
                  setShowDeleteModal(true);
                }}>
                  Delete
                </Button>
              </div> */}
              <div className="card-footer">
                <div className="row g-2">
                  <div className="">
                    <Button size="sm" variant="outline-primary" className="w-100" onClick={() => {
                      setSelectedJob(job);
                      setShowDetailsModal(true);
                    }}>
                      View Details
                    </Button>
                  </div>
                  <div className="col">
                    <Button size="sm" variant="success" className="w-100" onClick={() => handleEdit(job)}>
                      Edit
                    </Button>
                  </div>
                  <div className="col">
                    <Button size="sm" variant="danger" className="w-100" onClick={() => {
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
      <Modal show={showModal} onHide={() => setShowModal(false)} >
        <Modal.Header closeButton>
          <Modal.Title>{editingJob ? "Edit Job" : "Add Job"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {[
              ["job_title", "Job Title"],
              ["company", "Company"],
              ["location", "Location"],
              ["job_description", "Description"],
              ["requirements", "Requirements"],
              ["salary", "Salary"],
            ].map(([field, label]) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type={field === "salary" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                  as={field === "job_description" || field === "requirements" ? "textarea" : "input"}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingJob ? "Update" : "Save"}
            </Button>
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
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>

        {selectedJob && (
          <Modal.Body>
            <h5>{selectedJob.job_title}</h5>
            <p><strong>Company:</strong> {selectedJob.company}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Description:</strong> {selectedJob.job_description}</p>
            <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
            <p><strong>Salary:</strong> ₹{selectedJob.salary}</p>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default JobPage;
