import React from 'react'
import throttle from 'lodash.throttle'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import './SearchBooks.css'

class SearchBooks extends React.Component {
  state = {
    books: [],
    query: ''
  }

  execSearch = (query) => {
    const search = this.currentSearch = BooksAPI.search(query).then(books => {
      // setState only for the current search result.
      if (this.currentSearch === search)
        this.setState({ books })
    })
  }

  updateQuery(query) {
    this.currentSearch = null

    if (query)
      this.execSearch(query)

    this.setState({
      books: [],
      query
    })
  }

  componentDidMount() {
    this.input.focus()

    this.execSearch = throttle(this.execSearch, 1000, {
      leading: false,
      trailing: true
    })

    const { query } = this.state

    if (query)
      this.execSearch(query)
  }

  render() {
    const { books, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
              ref={node => this.input = node}
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>

        <div className="search-books-results">
          <BooksGrid
            books={books}
            onBookShelfChange={this.props.onBookShelfChange}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks
