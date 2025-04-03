import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { Modal, Button } from "react-bootstrap";

const BlogHandlingPage = () => {
  const [file, setFile] = useState(null);
  const [parsedContent, setParsedContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const parseCSV = () => {
    if (!file) {
      setErrorMessage("Please select a CSV file before parsing.");
      return;
    }
    setErrorMessage("");

    Papa.parse(file, {
      complete: (result) => {
        console.log("Parsed CSV Data:", result.data);
        const structuredData = processCSVData(result.data);
        setParsedContent(structuredData);
        setShowModal(true);
      },
      header: true, // Use the first row as column names
      skipEmptyLines: true,
    });
  };

  const processCSVData = (data) => {
    return {
      title: data[0]?.Title || "",
      metaTitle: data[0]?.MetaTitle || "",
      metaDescription: data[0]?.MetaDescription || "",
      introduction: data[0]?.Introduction || "",
      description: data
        .filter(row => row.Subtitle && row.Text)
        .map(row => ({
          subtitle: row.Subtitle || "",
          text: row.Text || "",
          image: row.ImagePath ? `/${row.ImagePath}` : null, // Convert path to URL
          altText: row.AltText || "",
        })),
      conclusion: data[0]?.Conclusion || "",
      socialLinks: extractLinks(data[0]?.SocialMedia || ""),
    };
  };

  const extractLinks = (text) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(linkRegex) || [];
    return matches.map(url => ({ platform: "Social Media", url }));
  };

  const handleSubmit = async () => {
    if (!parsedContent) {
      setErrorMessage("No parsed content to submit.");
      return;
    }
    setErrorMessage("");

    try {
      await axios.post("/api/upload-blog", parsedContent, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Blog uploaded successfully!");
    } catch (error) {
      console.error("Error uploading blog:", error);
      setErrorMessage("Failed to upload blog. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload and Parse CSV Blog Document</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={parseCSV}>Parse CSV</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Parsed Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {parsedContent && (
            <div>
              <h4>✔ Title</h4>
              <p>{parsedContent.title || "No title available"}</p>
              <h4>✔ Meta Title</h4>
              <p>{parsedContent.metaTitle || "No meta title available"}</p>
              <h4>✔ Meta Description</h4>
              <p>{parsedContent.metaDescription || "No meta description available"}</p>
              <h4>✔ Introduction</h4>
              <p>{parsedContent.introduction || "No introduction available"}</p>
              <h4>✔ Description</h4>
              {parsedContent.description.map((section, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <h5>{section.subtitle || "No subtitle"}</h5>
                  <p>{section.text || "No text available"}</p>
                  {section.image && (
                    <img 
                      src={section.image} 
                      alt={section.altText || "Blog Image"} 
                      style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }} 
                    />
                  )}
                </div>
              ))}
              <h4>✔ Conclusion</h4>
              <p>{parsedContent.conclusion || "No conclusion available"}</p>
              <h4>✔ Social Media Links</h4>
              {parsedContent.socialLinks.map((link, index) => (
                <p key={index}>
                  <a href={link.url || "#"}>{link.platform || "No platform specified"}</a>
                </p>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit Blog</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogHandlingPage;
