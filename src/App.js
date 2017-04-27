import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  render() {
    // Use component state to do routing. Figure I'd leave this up to you Ryan.

    return (
      <div className="app">
        <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact} />
      </div>
    );
  }
}

export default App;
