import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

function EditReview({ editReview, reviewId, initialRating, initialReviewText }) {
  const [rating, setRating] = useState(initialRating);
  const [reviewText, setReviewText] = useState(initialReviewText);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedReview = {
        rating: rating,
        review: reviewText,
      };
      await editReview(reviewId, updatedReview);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h3>Edit Review</h3>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Rating (1-5)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Review (up to 300 characters)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength="300"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Review
        </Button>
      </Form>
    </div>
  );
}

export default EditReview;
