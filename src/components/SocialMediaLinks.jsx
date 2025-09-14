import React, { useState } from "react";
import { Card, ListGroup, Button, Modal, Form } from "react-bootstrap";

const SocialMediaLinks = () => {
  const [links, setLinks] = useState([
    { platform: "Facebook", url: "https://facebook.com/yourpage" },
    { platform: "Instagram", url: "https://instagram.com/youraccount" },
    { platform: "Twitter", url: "https://twitter.com/youraccount" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/yourcompany" },
    { platform: "YouTube", url: "https://youtube.com/channel/yourchannel" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentLink, setCurrentLink] = useState({ platform: "", url: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Open modal (for add or edit)
  const handleShow = (link = { platform: "", url: "" }, index = null) => {
    setCurrentLink(link);
    setEditIndex(index);
    setShowModal(true);
  };

  // Save (edit or add new)
  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...links];
      updated[editIndex] = currentLink;
      setLinks(updated);
    } else {
      setLinks([...links, currentLink]);
    }
    setShowModal(false);
  };

  // Delete
  const handleDelete = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="p-3">
      <Card className="shadow-sm">
        <Card.Header as="h5" className="d-flex justify-content-between">
          Social Media Links
          <Button size="sm" variant="dark" onClick={() => handleShow()}>
            + Add Link
          </Button>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {links.map((link, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{link.platform}</strong> —{" "}
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.url}
                  </a>
                </div>
                <div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShow(link, index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Edit Link" : "Add Link"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Platform Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter platform (e.g. Facebook)"
                value={currentLink.platform}
                onChange={(e) =>
                  setCurrentLink({ ...currentLink, platform: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter profile URL"
                value={currentLink.url}
                onChange={(e) =>
                  setCurrentLink({ ...currentLink, url: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SocialMediaLinks;
