import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import BookList from './BookList'
import './App.css'

const Bookshelf = ({ books, onBookShelfChange }) => (
  <div className="bookshelf">
    {books.length ? (
      <BookList books={books} onBookShelfChange={onBookShelfChange}/>
    ) : (
      <p><em>No books here!</em></p>
    )}
  </div>
)

class BooksApp extends React.Component {
  state = {
    books: [],
    isLoading: true
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books, isLoading: false })
    })
  }

  handleBookShelfChange = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  render() {
    const { books, isLoading } = this.state

    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const read = books.filter(book => book.shelf === 'read')

    return (
      <BrowserRouter>
        <div className="app">
          <div className="book-search-open">
            <Link to="/search">Add a book</Link>
          </div>

          <Route path="/search" render={({ history }) => (
            <BookSearch
              onBookShelfChange={this.handleBookShelfChange}
              onClose={() => history.push('/')}
            />
          )}/>

          <div className="app-title">
            <h1>MyReads</h1>
          </div>

          <div className="app-content">
            {isLoading ? (
              <p>Loading your library...</p>
            ) : (
              <div>
                <h2 className="bookshelf-title">Currently Reading</h2>
                <Bookshelf
                  books={currentlyReading}
                  onBookShelfChange={this.handleBookShelfChange}
                />

                <h2 className="bookshelf-title">Want to Read</h2>
                <Bookshelf
                  books={wantToRead}
                  onBookShelfChange={this.handleBookShelfChange}
                />

                <h2 className="bookshelf-title">Read</h2>
                <Bookshelf
                  books={read}
                  onBookShelfChange={this.handleBookShelfChange}
                />
              </div>
            )}
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
