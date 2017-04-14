import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import './ListBooks.css'

const BookshelfBooks = ({ books, onBookShelfChange }) => (
  <div className="bookshelf-books">
    {books.length ? (
      <BooksGrid books={books} onBookShelfChange={onBookShelfChange}/>
    ) : (
      <p><em>No books here! <Link to="/search">Add some</Link></em></p>
    )}
  </div>
)

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { books } = this.props

    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const read = books.filter(book => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {books.length === 0 ? (
            <div className="getting-started">
              <p>You don't have any books yet. <Link to="/search">Add some</Link></p>
            </div>
          ) : (
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <BookshelfBooks
                  books={currentlyReading}
                  onBookShelfChange={this.props.onBookShelfChange}
                />
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <BookshelfBooks
                  books={wantToRead}
                  onBookShelfChange={this.props.onBookShelfChange}
                />
              </div>

              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <BookshelfBooks
                  books={read}
                  onBookShelfChange={this.props.onBookShelfChange}
                />
              </div>
            </div>
          )}
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>

    )
  }
}

export default ListBooks
