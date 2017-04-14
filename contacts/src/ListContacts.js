import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as ContactsAPI from './ContactsAPI'
import './ListContacts.css'

class ListContacts extends React.Component {
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

export default ListContacts
