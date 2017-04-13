import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import BookList from './BookList'
import './App.css'

const BookshelfBooks = ({ books, onBookShelfChange }) => (
  <div className="bookshelf-books">
    {books.length ? (
      <BookList books={books} onBookShelfChange={onBookShelfChange}/>
    ) : (
      <p><em>No books here! <Link to="/search">Add some</Link></em></p>
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
        <div>
          <Route exact path="/" render={() => (
            <div className="app">
              <div className="app-title">
                <h1>MyReads</h1>
              </div>

              <div className="app-content">
                {isLoading ? (
                  <div className="loading-message">
                    <p>Loading your library...</p>
                  </div>
                ) : books.length === 0 ? (
                  <div className="getting-started">
                    <p>You don't have any books yet. <Link to="/search">Add some</Link></p>
                  </div>
                ) : (
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <BookshelfBooks
                        books={currentlyReading}
                        onBookShelfChange={this.handleBookShelfChange}
                      />
                    </div>

                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <BookshelfBooks
                        books={wantToRead}
                        onBookShelfChange={this.handleBookShelfChange}
                      />
                    </div>

                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <BookshelfBooks
                        books={read}
                        onBookShelfChange={this.handleBookShelfChange}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>

          <Route path="/search" render={() => (
            <div className="app">
              <BookSearch onBookShelfChange={this.handleBookShelfChange}/>
            </div>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
