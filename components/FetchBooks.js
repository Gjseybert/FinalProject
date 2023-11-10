import React, { useState, useEffect } from 'react';

function FetchBooks() {
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        try {
            fetch('https://6521897aa4199548356d5792.mockapi.io/Code', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data)
                    setBooks(data);
                })
                .catch((error) => {
                    console.error('Error:', error)
                    setError(error);
                })
        } catch (error) {
            setError(error);
        }

    }, []);

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
