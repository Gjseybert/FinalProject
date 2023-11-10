import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap'

function BookDetails({ FetchBooks, addReview, loadBook }) {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBook() {
      try {
        const data = await FetchBooks();
        const bookToShow = data.find((b) => b.id === id);
        if (bookToShow) {
          setBook(bookToShow);
        }
      } catch (error) {
        setError(error);
      }
    }
    loadBook();
  }, [FetchBooks, id]);
  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const newReview = { rating, review: reviewText };
      await addReview(id, newReview);
      setRating('');
      setReviewText('');
      // Reload the book data to show the updated reviews
      loadBook();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Book Details</h2>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <p>{book.title} by {book.author}, Year: {book.year}</p>
      <h3>Reviews</h3>
      <ul>
        {book.reviews &&
          book.reviews.map((review, index) => (
            <><li key={index}>
              {review.rating} stars - {review.review}
            </li><li>
                <Link to="/">Home</Link>
              </li></>
          ))}
      </ul>
      <Form onSubmit={handleAddReview}>
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
          Add Review
        </Button>
      </Form>
    </div>
  );
}

export default BookDetails;