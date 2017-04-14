import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'
import escapeRegExp from 'escape-string-regexp'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import * as ContactsAPI from './ContactsAPI'
import ImageInput from './ImageInput'
import './App.css'

class ContactsApp extends React.Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts })
    })
  }

  addContact = (contact) => {
    this.setState(state => ({
      contacts: state.contacts.concat(contact)
    }))
  }

  removeContact = (contact) => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }))
  }

  render() {
    const { contacts } = this.state

    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
            <ListContactsPage contacts={contacts} onDeleteContact={this.removeContact}/>
          )}/>
          <Route path="/create" render={({ history }) => (
            <CreateContactPage onCreateContact={contact => {
              this.addContact(contact)
              history.push('/')
            }}/>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

class ListContactsPage extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  handleDelete = (contact) => {
    ContactsAPI.remove(contact)
    this.props.onDeleteContact(contact)
  }

  render() {
    const { contacts } = this.props
    const { query } = this.state

    let showingContacts
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter(contact => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <div className="search-contacts">
            <input
              type="text"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
              placeholder="Search contacts"
            />
          </div>

          <Link className="add-contact" to="/create">Add a New Contact</Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className="contact-list">
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className="contact-details">
                <p className="contact-name">{contact.name}</p>
                <p className="contact-email">{contact.email}</p>
              </div>
              <div className="contact-remove">
                <button onClick={() => this.handleDelete(contact)}>Remove</button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

class CreateContactPage extends React.Component {
  static propTypes = {
    onCreateContact: PropTypes.func.isRequired
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const values = serializeForm(form, { hash: true })

    if (values.name && values.email) {
      ContactsAPI.create(values).then(contact => {
        this.props.onCreateContact(contact)
        form.reset()
      })
    } else {
      window.alert('Please enter both a name and email address')
    }
  }

  render() {
    return (
      <div className="create-contact">
        <Link className="close-create-contact" to="/">Close</Link>

        <form onSubmit={this.handleSubmit}>
          <div className="create-contact-wrapper">
            <div className="create-contact-avatar">
              <ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64}/>
            </div>
            <div className="create-contact-details">
              <input className="create-contact-name" type="text" name="name" placeholder="Name"/>
              <input className="create-contact-email" type="text" name="email" placeholder="Email"/>
              <div className="create-contact-save">
                <button>Add Contact</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default ContactsApp
