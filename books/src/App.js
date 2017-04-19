import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

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

    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
            isLoading ? (
              <p className="loading-message">Loading...</p>
            ) : (
              <ListBooks
                books={books}
                onBookShelfChange={this.handleBookShelfChange}
              />
            )
          )}/>

          <Route path="/search" render={() => (
            <SearchBooks onBookShelfChange={this.handleBookShelfChange}/>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
