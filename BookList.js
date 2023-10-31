import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroup, Alert } from 'react-bootstrap';

function BookList({ AddBook, deleteBook }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await AddBook();
        setBooks(data);
      } catch (error) {
        setError(error);
      }
    }
    loadBooks();
  }, [AddBook]);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <h2>Book List</h2>
      <ListGroup>
        {books.map((book) => (
          <ListGroup.Item key={book.id}>
            {book.title} by {book.author}, Year: {book.year}
            <Link to={`/book/${book.id}`}>
              <Button variant="primary" className="ml-2">Edit</Button>
            </Link>
            <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default BookList;