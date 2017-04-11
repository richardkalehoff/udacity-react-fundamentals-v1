import React from 'react'
import BookCover from './BookCover'
import './BookList.css'

const BookList = ({ books, onBookShelfChange }) => (
  <ol className="book-list">
    {books.map(book => (
      <li key={book.id}>
        <div>
          <BookCover book={book}/>

          <div className="book-list-shelf-changer">
            <select
              value={book.shelf}
              onChange={event => onBookShelfChange(book, event.target.value)}
            >
              <option value="none" disabled>{book.shelf === 'none' ? 'Add' : 'Move'} to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {book.shelf !== 'none' && <option value="none">None</option>}
            </select>
          </div>
        </div>
      </li>
    ))}
  </ol>
)

export default BookList
