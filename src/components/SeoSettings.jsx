import React, { useState } from "react";
import { Card, ListGroup, Button, Modal, Form } from "react-bootstrap";

const SeoSettings = () => {
  const [seoFields, setSeoFields] = useState([
    {
      label: "Default Meta Title",
      type: "text",
      value: "Default title for search engines",
      note: "Recommended: 50-60 characters",
    },
    {
      label: "Default Meta Description",
      type: "textarea",
      value: "Default description for search engines",
      note: "Recommended: 150-160 characters",
    },
    {
      label: "Default Keywords",
      type: "text",
      value: "keyword1, keyword2, keyword3",
      note: "",
    },
    {
      label: "Default OG Image",
      type: "url",
      value: "https://example.com/default-og-image.jpg",
      note: "Recommended size: 1200x630px",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState({
    label: "",
    type: "text",
    value: "",
    note: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Open modal
  const handleShow = (field = { label: "", type: "text", value: "", note: "" }, index = null) => {
    setCurrentField(field);
    setEditIndex(index);
    setShowModal(true);
  };

  // Save (edit or add new)
  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...seoFields];
      updated[editIndex] = currentField;
      setSeoFields(updated);
    } else {
      setSeoFields([...seoFields, currentField]);
    }
    setShowModal(false);
  };

  // Delete
  const handleDelete = (index) => {
    setSeoFields(seoFields.filter((_, i) => i !== index));
  };

  return (
    <div className="p-3">
      <Card className="shadow-sm">
        <Card.Header as="h5" className="d-flex justify-content-between">
           SEO Settings
          <Button size="sm" variant="dark" onClick={() => handleShow()}>
            + Add Field
          </Button>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {seoFields.map((field, index) => (
              <ListGroup.Item key={index}>
                <Form.Group className="mb-2">
                  <Form.Label>{field.label}</Form.Label>
                  {field.type === "textarea" ? (
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={field.value}
                      onChange={(e) => {
                        const updated = [...seoFields];
                        updated[index].value = e.target.value;
                        setSeoFields(updated);
                      }}
                    />
                  ) : (
                    <Form.Control
                      type={field.type}
                      value={field.value}
                      onChange={(e) => {
                        const updated = [...seoFields];
                        updated[index].value = e.target.value;
                        setSeoFields(updated);
                      }}
                    />
                  )}
                  {field.note && (
                    <Form.Text className="text-muted">{field.note}</Form.Text>
                  )}
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShow(field, index)}
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
          <Modal.Title>{editIndex !== null ? "Edit Field" : "Add Field"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter field label"
                value={currentField.label}
                onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Input Type</Form.Label>
              <Form.Select
                value={currentField.type}
                onChange={(e) => setCurrentField({ ...currentField, type: e.target.value })}
              >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
                <option value="url">URL</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter default value"
                value={currentField.value}
                onChange={(e) => setCurrentField({ ...currentField, value: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Note (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recommendation or note"
                value={currentField.note}
                onChange={(e) => setCurrentField({ ...currentField, note: e.target.value })}
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

export default SeoSettings;
