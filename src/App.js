import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
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

    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
            <ListContacts
              contacts={this.state.contacts}
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
    );
  }
}

export default App;
