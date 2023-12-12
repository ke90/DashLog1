import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ProfilPicUploadModal({ show, onHide }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedFile) {
        console.log(selectedFile);
    }
    onHide();
  };

  return (
    <>
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Profilbild auswählen</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form.Group controlId="fileUpload" className="mb-3">
        <Form.Label>Pfad</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default ProfilPicUploadModal;
