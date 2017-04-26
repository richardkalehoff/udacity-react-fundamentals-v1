import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import ListContacts from './ListContacts'

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
            <ListContacts
              contacts={contacts}
              onDeleteContact={this.removeContact}
            />
          )}/>
          <Route path="/create" render={({ history }) => (
            <CreateContact onCreateContact={contact => {
              this.addContact(contact)
              history.push('/')
            }}/>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default ContactsApp
