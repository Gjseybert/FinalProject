import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';

function DeleteBook({ FetchBooks, deleteBook }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await FetchBooks();
        setBooks(data);
      } catch (error) {
        setError(error);
      }
    }
    loadBooks();
  }, [FetchBooks]);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Delete Book</h2>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}, Year: {book.year}
            <Button variant="danger" onClick={() => handleDelete(book.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default DeleteBook;