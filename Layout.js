import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
      <div>
        <nav>
          <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/book-list">Book List</Link>
            </li>
            <li>
            <Link to="/add-book">Add Book</Link>
            </li>
            <li>
              <Link to="/delete-book">Delete Book</Link>
            </li>
            <li>
            <Link to="/edit-book/:id">Edit Book</Link>
            </li>
          </ul>
        </nav>
  
        <hr />
        <Outlet />
      </div>
    );
  }

export default Layout;