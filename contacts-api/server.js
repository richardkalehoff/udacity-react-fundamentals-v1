const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const contacts = require('./contacts')

const app = express()

app.use(express.static('public'))
app.use(cors())

app.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})

app.get('/contacts', (req, res) => {
  res.send(contacts.get(req.token))
})

app.delete('/contacts/:id', (req, res) => {
  res.send(contacts.remove(req.token, req.params.id))
})

app.post('/contacts', bodyParser.json(), (req, res) => {
  const { name, email } = req.body

  if (name && email) {
    res.send(contacts.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: 'Please provide both a name and email address'
    })
  }
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
