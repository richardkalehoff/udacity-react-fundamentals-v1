import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as ContactsAPI from './ContactsAPI'
import ImageInput from './ImageInput'
import './CreateContact.css'

class CreateContact extends React.Component {
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

export default CreateContact
