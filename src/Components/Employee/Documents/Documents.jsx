import React, { useState } from "react";
import "./Documents.css";

const Documents = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Resume_Updated_2024.pdf",
      category: "Personal Documents",
      size: "2.4 MB",
      uploaded: "1/15/2024",
      status: "Approved",
    },
  ]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const newDoc = {
      id: Date.now(),
      name: file.name,
      category: "Uncategorized",
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploaded: new Date().toLocaleDateString(),
      status: "Processing",
    };

    setDocuments([newDoc, ...documents]);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  return (
    <div className="doc-container">
      <div className="doc-header">
        <div>
          <h2>Document Management</h2>
          <p>Upload, manage, and organize your important documents.</p>
        </div>
        <label className="upload-btn">
          + Upload Document
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
        </label>
      </div>

      {/* Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <h3>{documents.length}</h3>
          <p>Total Documents</p>
        </div>
        <div className="summary-card approved">
          <h3>{documents.filter((d) => d.status === "Approved").length}</h3>
          <p>Approved</p>
        </div>
        <div className="summary-card processing">
          <h3>{documents.filter((d) => d.status === "Processing").length}</h3>
          <p>Processing</p>
        </div>
        <div className="summary-card storage">
          <h3>
            {(
              documents.reduce((acc, d) => acc + parseFloat(d.size), 0) || 0
            ).toFixed(1)}{" "}
            MB
          </h3>
          <p>Storage Used</p>
        </div>
      </div>

      {/* Quick Upload Categories */}
      <h3 className="section-title">Quick Upload</h3>
      <div className="quick-grid">
        <button className="quick-card">Personal Documents</button>
        <button className="quick-card">Identity Documents</button>
        <button className="quick-card">Certifications</button>
        <button className="quick-card">Expense Reports</button>
      </div>

      {/* My Documents */}
      <h3 className="section-title">My Documents</h3>
      <div className="doc-list">
        {documents.map((doc) => (
          <div key={doc.id} className="doc-card">
            <div>
              <h4>{doc.name}</h4>
              <p>
                {doc.category} • {doc.size} • Uploaded {doc.uploaded}
              </p>
            </div>
            <div className="doc-actions">
              <span className={`status ${doc.status.toLowerCase()}`}>
                {doc.status}
              </span>
              <button title="View">👁</button>
              <button
                title="Delete"
                onClick={() => handleDelete(doc.id)}
                className="delete"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
