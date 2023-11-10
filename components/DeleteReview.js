import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';

function DeleteReview({ deleteReview, reviewId }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId);
      setShowModal(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Delete Review
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this review?</p>
          {error && <Alert variant="danger">{error.message}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteReview;
