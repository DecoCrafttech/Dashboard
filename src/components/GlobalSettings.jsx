import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MenuManager from "./MenuManager";
import SocialMediaLinks from "./SocialMediaLinks";
import SeoSettings from "./SeoSettings";
import TrackingScripts from "./TrackingScripts";

const GlobalSettingsComponent = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [formData, setFormData] = useState({
    siteTitle: "Your Website Title",
    companyName: "Your Company Name",
    siteDescription: "Brief description of your website",
    logoUrl: "https://example.com/logo.png",
    contactEmail: "contact@example.com",
    contactPhone: "+1 (555) 123-4567",
    businessAddress: "123 Main Street, City, State, ZIP",
  });

  const tabs = ["General", "Menu", "Social Media", "SEO", "Tracking"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", formData);
    // Handle save logic here
  };

  const styles = {
    globalSettingsContainer: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "24px",
    },
    globalSettingsCard: {
      margin: "0 auto",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    globalSettingsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "24px",
      borderBottom: "1px solid #e5e7eb",
    },
    globalSettingsHeaderContent: {
      display: "flex",
      flexDirection: "column",
    },
    globalSettingsTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "8px",
      margin: "0",
    },
    globalSettingsSubtitle: {
      color: "#6b7280",
      margin: "0",
    },
    globalSettingsSaveBtn: {
      backgroundColor: "#000000",
      color: "#ffffff",
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
    globalSettingsNavContainer: {
      padding: "0 24px",
      borderBottom: "1px solid #dee2e6",
    },
    globalSettingsNavPills: {
      display: "flex",
      flexWrap: "wrap",
      paddingLeft: "0",
      marginBottom: "0",
      listStyle: "none",
      margin: "0",
    },
    globalSettingsNavItem: {
      flex: "1 1 auto",
      textAlign: "center",
    },
    globalSettingsNavLink: {
      display: "block",
      padding: "12px 16px",
      color: "#6c757d",
      textDecoration: "none",
      backgroundColor: "transparent",
      border: "1px solid transparent",
      borderRadius: "0.375rem",
      margin: "4px 2px",
      transition:
        "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
    globalSettingsNavLinkActive: {
      color: "#ffffff",
      backgroundColor: "#0d6efd",
      borderColor: "#0d6efd",
    },
    globalSettingsContent: {
      padding: "24px",
    },
    globalSettingsSection: {
      marginBottom: "32px",
    },
    globalSettingsSectionHeader: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "24px",
    },
    globalSettingsSectionIcon: {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "#1f2937",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    globalSettingsSectionTitle: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#111827",
      margin: "0",
    },
    globalSettingsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "24px",
    },
    globalSettingsGridLg: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "24px",
    },
    globalSettingsField: {
      display: "flex",
      flexDirection: "column",
    },
    globalSettingsFieldFull: {
      gridColumn: "span 2",
    },
    globalSettingsLabel: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "8px",
    },
    globalSettingsInput: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxSizing: "border-box",
    },
    globalSettingsTextarea: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
      resize: "none",
      fontFamily: "inherit",
      boxSizing: "border-box",
    },
    globalSettingsPlaceholder: {
      textAlign: "center",
      paddingTop: "48px",
      paddingBottom: "48px",
    },
    globalSettingsPlaceholderIcon: {
      width: "48px",
      height: "48px",
      color: "#9ca3af",
      margin: "0 auto 16px",
    },
    globalSettingsPlaceholderTitle: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#111827",
      marginBottom: "8px",
      margin: "0 0 8px 0",
    },
    globalSettingsPlaceholderText: {
      color: "#6b7280",
      margin: "0",
    },
  };

  // Add focus styles dynamically
  const handleFocus = (e) => {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "#d1d5db";
    e.target.style.boxShadow = "none";
  };

  const handleSaveBtnHover = (e) => {
    e.target.style.backgroundColor = "#374151";
  };

  const handleSaveBtnLeave = (e) => {
    e.target.style.backgroundColor = "#000000";
  };

  return (
    <div style={styles.globalSettingsContainer}>
      <div style={styles.globalSettingsCard}>
        {/* Header */}
        <div style={styles.globalSettingsHeader}>
          <div style={styles.globalSettingsHeaderContent}>
            <h1 style={styles.globalSettingsTitle}>Global Settings</h1>
            <p style={styles.globalSettingsSubtitle}>
              Configure your website's global settings and preferences
            </p>
          </div>
          <button
            style={styles.globalSettingsSaveBtn}
            onClick={handleSave}
            onMouseEnter={handleSaveBtnHover}
            onMouseLeave={handleSaveBtnLeave}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Save Settings
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={styles.globalSettingsNavContainer}>
          <ul style={styles.globalSettingsNavPills}>
            {tabs.map((tab) => (
              <li key={tab} style={styles.globalSettingsNavItem}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                  style={{
                    ...styles.globalSettingsNavLink,
                    ...(activeTab === tab
                      ? styles.globalSettingsNavLinkActive
                      : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) {
                      e.target.style.backgroundColor = "#f8f9fa";
                      e.target.style.color = "#495057";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#6c757d";
                    }
                  }}
                >
                  {tab}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="p-3">
          {activeTab === "General" && (
            <div>
              {/* Site Information Section */}
              <div style={styles.globalSettingsSection}>
                <div style={styles.globalSettingsSectionHeader}>
                  <div style={styles.globalSettingsSectionIcon}>
                    <svg
                      width="12"
                      height="12"
                      fill="#ffffff"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 style={styles.globalSettingsSectionTitle}>
                    Site Information
                  </h2>
                </div>

                <Form>
                  <Row>
                    <Col>
                      <Form.Label>Site title </Form.Label>
                      <Form.Control
                        type="type"
                        placeholder="Enter site title"
                      />
                    </Col>
                    <Col>
                      <Form.Label>Company Name </Form.Label>
                      <Form.Control
                        type="type"
                        placeholder="Enter Company name"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label>Site Description </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Description"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Label> Company Logo URL </Form.Label>
                      <Form.Control type="type" placeholder="Enter Logo Url" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Button
                        variant="primary "
                        className="mt-3 px-3 align-items-end  text-end "
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>

                <div style={styles.globalSettingsGridLg}></div>
              </div>

              {/* Contact Information Section */}
              <div style={styles.globalSettingsSection}>
                <h2 style={styles.globalSettingsSectionTitle}>
                  Contact Information
                </h2>

                <div>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Row>
                        <Col>
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="type" placeholder="Enter email" />
                        </Col>
                        <Col>
                          <Form.Label>Contact Number</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Enter Contact Number"
                          />
                        </Col>
                      </Row>
                      <Form.Label>Bussiness Address </Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Bussiness Address"
                      />
                    </Form.Group>
                    <Row>
                    <Col>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Button
                        variant="primary "
                        className="mt-3 px-3 align-items-end  text-end "
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                  </Form>
                </div>
              </div>
            </div>
          )}
        </div>
          {/* Menu Settings Tab */}
        <div >
          {activeTab === "Menu" && (
            <MenuManager />
          )}
        </div>

        <div >
          {activeTab === "Social Media" && (
            <SocialMediaLinks />
          )}
        </div>

        <div >
          {activeTab === "SEO" && (
            <SeoSettings />
          )}
        </div>

        <div >
          {activeTab === "Tracking" && (
            <TrackingScripts />
          )}
        </div>
        
        
      </div>
    </div>
  );
};

export default GlobalSettingsComponent;
