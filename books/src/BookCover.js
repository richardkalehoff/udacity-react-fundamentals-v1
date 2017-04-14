import React from 'react'
import './BookCover.css'

class BookCover extends React.Component {
  static defaultProps = {
    maxWidth: 140
  }

  state = {
    image: null
  }

  componentDidMount() {
    const { book } = this.props

    if (book.imageLinks) {
      let link = book.imageLinks.thumbnail

      // Remove the edge=curl query param if present.
      if (link.indexOf('&edge=curl') > 0)
        link = link.replace('&edge=curl', '')

      const image = new Image()

      image.onload = () => {
        if (!this.__isUnmounted)
          this.setState({ image })
      }

      image.src = link
    }
  }

  componentWillUnmount() {
    this.__isUnmounted = true
  }

  render() {
    const { book, maxWidth } = this.props
    const { image } = this.state

    const style = {}
    let children

    if (image) {
      if (image.width > maxWidth) {
        style.width = maxWidth
        style.height = Math.floor((maxWidth / image.width) * image.height)
      } else {
        style.width = image.width
        style.height = image.height
      }

      style.backgroundImage = `url("${image.src}")`
    } else {
      style.width = maxWidth
      style.height = Math.round(style.width * 1.33)
      children = (
        <div className="book-cover-title">{book.title}</div>
      )
    }

    return (
      <div className="book-cover" style={style} children={children}/>
    )
  }
}

export default BookCover
