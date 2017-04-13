import React from 'react'
import './BookCover.css'

class BookCover extends React.Component {
  static defaultProps = {
    maxHeight: 200
  }

  state = {
    image: null
  }

  componentDidMount() {
    const { book } = this.props

    if (book.imageLinks) {
      let link = book.imageLinks.thumbnail

      // Remove the edge=curl query param if present.
      if (link.indexOf('&edge=curl') > 0) {
        link = link.replace('&edge=curl', '')
      }

      const image = new Image()

      image.onload = () => {
        if (!this.__isUnmounted) {
          this.setState({ image })
        }
      }

      image.src = link
    }
  }

  componentWillUnmount() {
    this.__isUnmounted = true
  }

  render() {
    const { book, maxHeight } = this.props
    const { image } = this.state

    const style = {}
    let children

    if (image) {
      if (image.height > maxHeight) {
        style.width = (maxHeight / image.height) * image.width
        style.height = maxHeight
      } else {
        style.height = image.height
        style.width = image.width
      }

      style.backgroundImage = `url("${image.src}")`
    } else {
      style.height = maxHeight
      style.width = Math.round(style.height * 0.66)

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
