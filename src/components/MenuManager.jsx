import React, { useState } from "react";
import {
  Button,
  Card,
  ListGroup,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";

const MenuManager = () => {
  // Navigation Menu
  const [menuItems, setMenuItems] = useState([
    "Home",
    "Destinations",
    "International",
    "Domestic",
    "Blog",
    "About",
    "Contact",
  ]);

  // Footer Menu
  const [footerItems, setFooterItems] = useState({
    "Quick Links": ["Privacy Policy", "Terms of Service", "Sitemap"],
    Services: ["Tour Packages", "Hotel Bookings", "Travel Insurance"],
    Support: ["FAQ", "Contact Us", "Help Center"],
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [isFooter, setIsFooter] = useState(false);

  // Open modal for edit/add
  const handleShow = (item, category = "", footer = false) => {
    setEditItem(item);
    setEditCategory(category);
    setIsFooter(footer);
    setShowModal(true);
  };

  // Save edit/add
  const handleSave = () => {
    if (isFooter) {
      setFooterItems((prev) => {
        const updated = { ...prev };
        if (editCategory) {
          const index = updated[editCategory].indexOf(editItem.old || "");
          if (index > -1) {
            updated[editCategory][index] = editItem.value; // update
          } else {
            updated[editCategory].push(editItem.value); // add
          }
        }
        return updated;
      });
    } else {
      if (editItem.old) {
        setMenuItems((prev) =>
          prev.map((m) => (m === editItem.old ? editItem.value : m))
        );
      } else {
        setMenuItems((prev) => [...prev, editItem.value]);
      }
    }
    setShowModal(false);
  };

  // Remove menu item
  const handleRemove = (item) => {
    setMenuItems(menuItems.filter((m) => m !== item));
  };

  // Remove footer item
  const handleRemoveFooter = (category, item) => {
    setFooterItems((prev) => {
      const updated = { ...prev };
      updated[category] = updated[category].filter((i) => i !== item);
      return updated;
    });
  };

  return (
    <div className="p-2">
      {/* Navigation Menu */}
      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5" className="d-flex justify-content-between">
          Navigation Menu
          <Button
            size="sm"
            variant="dark"
            onClick={() => handleShow({ value: "" })}
          >
            Add Menu Item
          </Button>
        </Card.Header>
        <Card.Body>
          <p className="text-muted">
            Configure your website’s main navigation menu. Add, remove, or
            reorder menu items.
          </p>
          <ListGroup>
            {menuItems.map((item, idx) => (
              <ListGroup.Item
                key={idx}
                className="d-flex justify-content-between align-items-center"
              >
                {item}
                <div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShow({ old: item, value: item })}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Footer Menu */}
      <Card className="shadow-sm">
        <Card.Header as="h5">Footer Menu</Card.Header>
        <Card.Body>
          <p className="text-muted">
            Configure footer navigation links and additional pages.
          </p>
          <Row>
            {Object.keys(footerItems).map((category, idx) => (
              <Col md={4} key={idx}>
                <h6 className="d-flex justify-content-between align-items-center">
                  {category}
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={() =>
                      handleShow({ value: "" }, category, true)
                    }
                  >
                    +
                  </Button>
                </h6>
                <ListGroup>
                  {footerItems[category].map((item, i) => (
                    <ListGroup.Item
                      key={i}
                      className="d-flex justify-content-between align-items-center"
                    >
                      {item}
                      <div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() =>
                            handleShow({ old: item, value: item }, category, true)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveFooter(category, item)}
                        >
                          Remove
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editItem?.old ? "Edit Item" : "Add Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={editItem?.value || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, value: e.target.value })
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

export default MenuManager;
