import React, { useState } from "react";
import { Card, ListGroup, Button, Modal, Form } from "react-bootstrap";

const TrackingScripts = () => {
  const [trackingFields, setTrackingFields] = useState([
    {
      label: "Google Analytics ID",
      type: "text",
      value: "G-XXXXXXXXXX or UA-XXXXXXXXX-X",
      note: "",
    },
    {
      label: "Google Ads ID",
      type: "text",
      value: "AW-XXXXXXXXX",
      note: "",
    },
    {
      label: "Facebook Pixel ID",
      type: "text",
      value: "XXXXXXXXXXXXXXX",
      note: "",
    },
    {
      label: "Custom Head Scripts",
      type: "textarea",
      value: "<script>/* Custom scripts in <head> */</script>",
      note: "Scripts added here will be inserted in the <head> section",
    },
    {
      label: "Custom Body Scripts",
      type: "textarea",
      value: "<script>/* Custom scripts before </body> */</script>",
      note: "Scripts added here will be inserted before closing </body>",
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

  // Save (edit or add)
  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...trackingFields];
      updated[editIndex] = currentField;
      setTrackingFields(updated);
    } else {
      setTrackingFields([...trackingFields, currentField]);
    }
    setShowModal(false);
  };

  // Delete field
  const handleDelete = (index) => {
    setTrackingFields(trackingFields.filter((_, i) => i !== index));
  };

  return (
    <div className="p-3">
      <Card className="shadow-sm">
        <Card.Header as="h5" className="d-flex justify-content-between">
          Tracking Scripts
          <Button size="sm" variant="dark" onClick={() => handleShow()}>
            + Add Field
          </Button>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {trackingFields.map((field, index) => (
              <ListGroup.Item key={index}>
                <Form.Group className="mb-2">
                  <Form.Label>{field.label}</Form.Label>
                  {field.type === "textarea" ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={field.value}
                      onChange={(e) => {
                        const updated = [...trackingFields];
                        updated[index].value = e.target.value;
                        setTrackingFields(updated);
                      }}
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      value={field.value}
                      onChange={(e) => {
                        const updated = [...trackingFields];
                        updated[index].value = e.target.value;
                        setTrackingFields(updated);
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
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Value</Form.Label>
              <Form.Control
                as={currentField.type === "textarea" ? "textarea" : "input"}
                rows={3}
                placeholder="Enter default value or script"
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

export default TrackingScripts;
