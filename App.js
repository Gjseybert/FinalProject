// Import the necessary modules and components
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import DeleteBook from './components/DeleteBook';
import ReviewList from './components/ReviewList';
import AddReview from './components/AddReview';
import DeleteReview from './components/DeleteReview';
import EditReview from './components/EditReview';
import Layout from './components/Layout';

// Define the main App component
function App() {
  return (
    <div className="App">
      {/* Application title */}
      <h1 className="mt-4">Library App</h1>
      
      {/* Define the application's routes using the Routes and Route components */}
      <Routes>
        <Route path="/" element={<Layout />}/>         {/* Default layout */}
        <Route path="/book-list" element={<BookList />}/> {/* Display the book list */}
        <Route path="/add-book" element={<AddBook />} />   {/* Add a new book */}
        <Route path="/edit-book/:id" element={<EditBook />} />  {/* Edit an existing book */}
        <Route path="/delete-book/:id" element={<DeleteBook/>} />  {/* Delete a book */}
        <Route path="/review-list" element={<ReviewList />}/> {/* Display the review list */}
        <Route path="/add-review" element={<AddReview />} />   {/* Add a new review */}
        <Route path="/edit-review/:id" element={<EditReview />} />  {/* Edit an existing review */}
        <Route path="/delete-review/:id" element={<DeleteReview/>} />  {/* Delete a review */}
      </Routes>
    </div>
  );
}

// Export the App component
export default App;
