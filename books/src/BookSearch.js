import React from 'react'
import throttle from 'lodash.throttle'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import './BookSearch.css'

class BookSearch extends React.Component {
  state = {
    books: [],
    query: ''
  }

  execSearch = (query) => {
    const search = this.search = BooksAPI.search(query).then(books => {
      // setState only for the current search result.
      if (this.search === search) {
        this.setState({ books })
      }
    })
  }

  updateQuery(query) {
    if (query) {
      this.execSearch(query)
    }

    this.setState({
      books: [],
      query
    })
  }

  componentDidMount() {
    this.input.focus()

    this.execSearch = throttle(this.execSearch, 1000, {
      leading: false
    })

    const { query } = this.state

    if (query) {
      this.execSearch(query)
    }
  }

  render() {
    const { books, query } = this.state

    return (
      <div className="book-search">
        <div className="book-search-bar">
          <input
            type="search"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
            ref={node => this.input = node}
            placeholder="search by title, author, or ISBN"
          />

          <Link className="book-search-close-link" to="/">Close</Link>
        </div>

        <div className="book-search-results">
          <BookList
            books={books}
            onBookShelfChange={this.props.onBookShelfChange}
          />
        </div>
      </div>
    )
  }
}

export default BookSearch
