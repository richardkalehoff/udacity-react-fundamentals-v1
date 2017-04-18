require('isomorphic-fetch')
const clone = require('clone')

const db = {}

const defaultData = {
  currentlyReading: [ 'wO3PCgAAQBAJ', 'PGR2AwAAQBAJ' ],
  wantToRead: [ '_oaAHiFOZmgC', 'uu1mC6zWNTwC' ],
  read: [ 'wrOQLV6xB-wC', 'pD6arNyKyi8C', 'A4xbYvAclCYC', '32haAAAAMAAJ' ]
}

const getData = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const getShelf = (token, bookId) => {
  const data = getData(token)
  const keys = Object.keys(data)
  return keys.find(key => data[key].includes(bookId)) || 'none'
}

const addShelf = (token) => (book) => {
  book.shelf = getShelf(token, book.id)
  return book
}

const api = 'https://www.googleapis.com/books/v1'

const createBook = (item) => Object.assign({}, item.volumeInfo, {
  id: item.id
})

const get = (token, id) =>
  fetch(`${api}/volumes/${id}`)
    .then(res => res.json())
    .then(createBook)
    .then(addShelf(token))

const getAll = (token) => {
  const data = getData(token)
  const bookIds = Object.keys(data).reduce((memo, shelf) => (
    memo.concat(data[shelf])
  ), [])

  return Promise.all(bookIds.map(bookId => get(token, bookId)))
}

const update = (token, bookId, shelf) =>
  new Promise(resolve => {
    const data = getData(token)

    Object.keys(data).forEach(s => {
      if (s === shelf) {
        if (!data[s].includes(bookId))
          data[s].push(bookId)
      } else {
        data[s] = data[s].filter(id => id !== bookId)
      }
    })

    resolve(data)
  })

const search = (token, query, maxResults = 20) =>
  fetch(`${api}/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&fields=items(id,volumeInfo)`)
    .then(res => res.json())
    .then(data => data.items.map(createBook))
    .then(books => books.map(addShelf(token)))

module.exports = {
  get,
  getAll,
  update,
  search
}
