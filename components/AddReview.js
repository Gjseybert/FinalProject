import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

// Define the AddReview component
export default function AddReview() {
  // Define state variables for the form inputs and error
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [error, setError] = React.useState(null);

  // Function to make a POST request to add a review
  function postReview(review) {
    console.log(review);
    fetch('https://6521897aa4199548356d5792.mockapi.io/Code/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
      })
      .catch((error) => {
        console.error('Error:', error)
        setError(error);
      });
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new review object from form input values
    const newReview = {
      title: e.target.title.value,
      author: e.target.author.value,
      rating: e.target.rating.value,
    };

    // Call the postReview function to add the review
    postReview(newReview);

    // Reset the form input fields
    setTitle('');
    setAuthor('');
    setRating('');
  };

  // Render the AddReview component
  return (
    <div>
      <h2>Add a New Review</h2>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control type="number" name="rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Review
        </Button>
      </Form>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
