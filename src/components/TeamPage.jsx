import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const API_URL = "https://api.admin.pixeladvant.com/api/teams/";

const TeamsPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    description: "",
    image: null,
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);


  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(API_URL);
      setTeamMembers(response.data);
    } catch (err) {
      console.error("Error fetching team members:", err);
      toast.error("Failed to fetch team members");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("position", formData.position);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      if (editingMember) {
        await axios.patch(`${API_URL}${editingMember.id}/`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Team member updated!");
      } else {
        await axios.post(API_URL, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Team member added!");
      }
      setShowModal(false);
      setEditingMember(null);
      setFormData({
        name: "",
        position: "",
        description: "",
        image: null,
      });
      fetchTeamMembers();
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to submit");
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      description: member.description,
      image: null,
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}${memberToDelete.id}/`);
      toast.success("Team member deleted!");
      setShowDeleteModal(false);
      setMemberToDelete(null);
      fetchTeamMembers();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete member");
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Team Members</h2>
        <Button
         className="postbutton"
          onClick={() => {
            setFormData({ name: "", position: "", description: "", image: null });
            setEditingMember(null);
            setShowModal(true);
          }}
        >
         + Add Team Member
        </Button>
      </div>

      <hr />

      <div className="row g-4">
        {teamMembers.map((member) => (
          <div className="col-md-4 d-flex mb-4" key={member.id}>
            <div className="card h-100 w-100">
              {member.image && (
                <img
                  src={member.image}
                  className="card-img-top"
                  alt={member.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{member.position}</h6>
                <p className="card-text">
                  {member.description.length > 50
                    ? `${member.description.slice(0, 50)}...`
                    : member.description}
                </p>
              </div>

              <div className="card-footer">
                <div className="row g-2">
                  <div className="">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="w-100"
                      onClick={() => {
                        setSelectedMember(member);
                        setShowDetailsModal(true);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                  <div className="col">
                    <Button size="sm" 
                    variant="success" 
                    className="w-100"
                    onClick={() => handleEdit(member)}>
                      Edit
                    </Button>
                  </div>
                  <div className="col">
                    <Button
                      size="sm"
                      variant="danger"
                      className="w-100"
                      onClick={() => {
                        setMemberToDelete(member);
                        setShowDeleteModal(true);
                      }}
                    >
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{editingMember ? "Edit" : "Add"} Team Member</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                required
                value={formData.position}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
              {editingMember?.image && (
                <small className="text-muted d-block mt-1">
                  Current image: <a href={editingMember.image} target="_blank" rel="noreferrer">view</a>
                </small>
              )}
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingMember ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{memberToDelete?.name}</strong>?
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

      {/* view in details */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Team Member Details</Modal.Title>
        </Modal.Header>
        {selectedMember && (
          <Modal.Body>
            {selectedMember.image && (
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="img-fluid mb-3"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            )}
            <h5>{selectedMember.name}</h5>
            <h6 className="text-muted">{selectedMember.position}</h6>
            <p>{selectedMember.description}</p>
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

export default TeamsPage;
