import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

function EditBook(updateBook, FetchBooks) {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBook() {
      try {
        const data = await FetchBooks();
        const bookToUpdate = data.find((b) => b.id === id);
        if (bookToUpdate) {
          setBook(bookToUpdate);
          setTitle(bookToUpdate.title);
          setAuthor(bookToUpdate.author);
          setYear(bookToUpdate.year);
        }
      } catch (error) {
        setError(error);
      }
    }
    loadBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = { title, author, year };
      await updateBook(id, updatedBook);
      // Redirect to the book details page after updating
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <Link to={`/book/${id}`}>
        &larr; Back to Book Details
      </Link>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Book
        </Button>
      </Form>
    </div>
  );
}

export default EditBook;