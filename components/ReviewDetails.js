import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ReviewDetails({ rating, reviewText, onEdit, onDelete }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Review Details</Card.Title>
        <Card.Text>
          <strong>Rating:</strong> {rating} stars
        </Card.Text>
        <Card.Text>
          <strong>Review:</strong> {reviewText}
        </Card.Text>
        <Button variant="primary" onClick={onEdit}>
          Edit Review
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete Review
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ReviewDetails;