import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class AddUserForm extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h3>Add user</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Field name="firstName" component={ErrorField} label="First name" />
          </div>
          <div>
            <Field name="lastName" component={ErrorField} label="Last name" />
          </div>
          <div>
            <Field name="email" component={ErrorField} label="Email" />
          </div>
          <button type="submit">Add user</button>
        </form>
      </div>
    )
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.handleSubmit()
    this.props.reset()
  }
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!firstName) errors.firstName = 'first name is a required field'

  if (!firstName) errors.lastName = 'last name is a required field'

  if (!email) errors.email = 'email is a required field'
  else if (!emailValidator.validate(email)) errors.email = 'invalid email'

  return errors
}

export default reduxForm({
  form: 'users',
  validate
})(AddUserForm)
