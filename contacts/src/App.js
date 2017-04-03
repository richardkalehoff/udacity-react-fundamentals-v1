import React from 'react'
import serializeForm from 'form-serialize'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as ContactsAPI from './ContactsAPI'
import ImageInput from './ImageInput'
import './App.css'

class ContactsApp extends React.Component {
  state = {
    contacts: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
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

    ContactsAPI.deleteContact(contact)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const values = serializeForm(form, { hash: true })

    if (values.name && values.email) {
      ContactsAPI.createContact(values).then(contact => {
        this.addContact(contact)
        form.reset()
      })
    } else {
      window.alert('Please enter both a name and email address')
    }
  }

  componentDidMount() {
    ContactsAPI.getContacts().then(contacts => {
      this.setState({ contacts })
    })
  }

  render() {
    const { contacts, query } = this.state

    let showingContacts
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter(contact => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className="app">
        <div className="search-contacts">
          <input
            type="search"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
            placeholder="Search contacts"
          />
        </div>

        {showingContacts.length !== contacts.length ? (
          <div className="showing-contacts">
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        ) : (
          null
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
              <div className="remove-contact-button">
                <button onClick={() => this.removeContact(contact)}>Remove</button>
              </div>
            </li>
          ))}
        </ol>

        <form onSubmit={this.handleSubmit}>
          <div className="create-contact-wrapper">
            <div className="create-contact">
              <div className="create-contact-avatar">
                <ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64}/>
              </div>
              <div className="create-contact-details">
                <input className="create-contact-name" type="text" name="name" placeholder="Name"/>
                <input className="create-contact-email" type="text" name="email" placeholder="Email"/>
              </div>
              <div className="create-contact-button">
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
