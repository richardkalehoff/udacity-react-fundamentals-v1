import React from 'react'
import './BookCover.css'

const BookCover = ({ book, height = 200 }) => {
  const style = {
    height,
    width: Math.round(height * 0.66)
  }

  let link
  if (book.imageLinks) {
    link = book.imageLinks.thumbnail

    // Remove the edge=curl query param if present.
    if (link.indexOf('&edge=curl') > 0) {
      link = link.replace('&edge=curl', '')
    }
  }

  return (
    <div className="book-cover" style={style}>
      {link ? (
        <div className="book-cover-image" style={{
          backgroundImage: `url("${link}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain'
        }}/>
      ) : (
        <div className="book-cover-info">
          <div className="book-cover-title">{book.title}</div>
          {book.authors && <div className="book-cover-author">{book.authors.join(', ')}</div>}
        </div>
      )}
    </div>
  )
}

export default BookCover
