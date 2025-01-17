import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { ToastContainer, toast } from "react-toastify";

const JobHandlingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobInput, setJobInput] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    salary: "",
  });
  const [jobs, setJobs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  // Validate job input fields
  const validateJobInput = () => {
    const errors = {};
    if (!jobInput.title.trim()) errors.title = "Job title is required.";
    if (!jobInput.company.trim()) errors.company = "Company name is required.";
    if (!jobInput.location.trim()) errors.location = "Job location is required.";
    if (!jobInput.description.trim()) errors.description = "Job description is required.";
    return errors;
  };

  // Handle Add or Edit Job
  const handleSaveJob = () => {
    const validationErrors = validateJobInput();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedJobs = jobs.map((job, index) =>
        index === editIndex ? jobInput : job
      );
      setJobs(updatedJobs);
      toast.success("Job updated successfully!");
    } else {
      setJobs([...jobs, jobInput]);
      toast.success("Job posted successfully!");
    }

    resetForm();
  };

  // Reset form after save or cancel
  const resetForm = () => {
    setJobInput({
      title: "",
      company: "",
      location: "",
      description: "",
      requirements: "",
      salary: "",
    });
    setErrors({});
    setEditIndex(null);
    setShowModal(false);
  };

  // Handle Edit Job
  const handleEditJob = (index) => {
    setJobInput(jobs[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  // Handle Delete Job
  const handleDeleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
    toast.success("Job deleted successfully!");
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Job Management</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Post Job
        </button>
      </div>

      {/* Job Cards Section */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {jobs.length === 0 ? (
          <p className="text-center">No jobs posted yet!</p>
        ) : (
          jobs.map((job, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text">
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="card-text">{job.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-warning w-50 me-2"
                    onClick={() => handleEditJob(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger w-50"
                    onClick={() => handleDeleteJob(index)}
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
                  {editIndex !== null ? "Edit Job" : "Post Job"}
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
                  <label htmlFor="title" className="form-label">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    value={jobInput.title}
                    onChange={(e) =>
                      setJobInput({ ...jobInput, title: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="company" className="form-label">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className={`form-control ${
                      errors.company ? "is-invalid" : ""
                    }`}
                    value={jobInput.company}
                    onChange={(e) =>
                      setJobInput({ ...jobInput, company: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className={`form-control ${
                      errors.location ? "is-invalid" : ""
                    }`}
                    value={jobInput.location}
                    onChange={(e) =>
                      setJobInput({ ...jobInput, location: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    value={jobInput.description}
                    onChange={(e) =>
                      setJobInput({ ...jobInput, description: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="requirements" className="form-label">
                    Requirements
                  </label>
                  <textarea
                    id="requirements"
                    className="form-control"
                    value={jobInput.requirements}
                    onChange={(e) =>
                      setJobInput({ ...jobInput, requirements: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">
                    Salary
                  </label>
                  <input
                    type="text"
                    id="salary"
                    className="form-control"
                    value={jobInput.salary}
                    onChange={(e) =>
                      setJobInput({ ...jobInput, salary: e.target.value })
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
                  onClick={handleSaveJob}
                >
                  {editIndex !== null ? "Update Job" : "Post Job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobHandlingPage;
