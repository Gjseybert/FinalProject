import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroup, Alert } from 'react-bootstrap';

// Define the ReviewList component
function ReviewList({ deleteReview }) {
  // Define state variables for the review list and error
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use the useEffect hook to load reviews when the component mounts
  useEffect(() => {
    // Define an async function to load reviews
    async function loadReviews() {
      try {
        // Make a GET request to fetch the list of reviews from the API
        const response = await fetch('https://6521897aa4199548356d5792.mockapi.io/Code/reviews', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        console.log('Success:', data);

        // Set the retrieved reviews in the state
        setReviews(data);
      } catch (error) {
        console.error('Error:', error);
        // Set the error state if there's an issue with the request
        setError(error);
      } finally {
        // Set loading to false once the data is fetched, regardless of success or failure
        setIsLoading(false);
      }
    }

    // Call the loadReviews function when the component mounts
    loadReviews();
  }, []);

  // Check if there's an error, and if so, display an alert
  if (error) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // Check if the data is still loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Render the ReviewList component
  return (
    <div>
      <h2>Review List</h2>
      <ListGroup>
        {reviews.map((review) => (
          <ListGroup.Item key={review.id}>
            {review.title} by {review.author}, Rating: {review.rating}
            <Link to={`/edit-review/${review.id}`}>
              <Button variant="primary" className="ml-2">Edit</Button>
            </Link>
            <Link to={`/delete-review/${review.id}`}>
              <Button variant="danger" className="ml-2">Delete</Button>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

// Export the ReviewList component
export default ReviewList;