import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

export default function ExampleFetch() {
const [title, setTitle] = React.useState('');
const [author, setAuthor] = React.useState('');
const [year, setYear] = React.useState('');
const [error, setError] = React.useState(null);

function postBook(book) {
  console.log(book);
  fetch('http://localhost:3000/book-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
      setError(error);
    })

}

const handleSubmit = (e) => {
  e.preventDefault()

  const newBook = {
    title: e.target.title.value,
    author: e.target.author.value,
    year: e.target.year.value,

  }
  postBook(newBook)
    setTitle('');
    setAuthor('');
    setYear(''); 
}
return (
  <div>
    <h2>Add a New Book</h2>
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
        <Form.Label>Year</Form.Label>
        <Form.Control type="number" name="year" value={year} onChange={(e) => setYear(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Book
      </Button>
    </Form>
    <Link to="/">Back to Home</Link>
  </div>
)
}