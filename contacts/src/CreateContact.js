import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as ContactsAPI from './utils/ContactsAPI'
import ImageInput from './ImageInput'

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
      <div>
        <Link className="close-create-contact" to="/">Close</Link>

        <form className="create-contact-form" onSubmit={this.handleSubmit}>
          <ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64}/>
          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="email" placeholder="Email"/>
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact
