import React, { useState, useEffect } from 'react';

function FetchBooks({ data }) {
  const [books, setBooks] = useState(data);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function FetchData() {
      try {
        setBooks(data);
      } catch (error) {
        setError(error);
      }
    }

    FetchData();
  }, [data]);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} by {book.author}, Year: {book.year}</li>
        ))}
      </ul>
    </div>
  );
}

export default FetchBooks;
