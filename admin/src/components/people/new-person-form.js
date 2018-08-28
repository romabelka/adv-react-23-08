import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class NewPersonForm extends Component {
  static propTypes = {}

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field name="firstName" label="First Name" component={ErrorField} />
        <Field name="lastName" label="Last Name" component={ErrorField} />
        <Field name="email" label="Email" component={ErrorField} />
        <button type="submit">Create</button>
      </form>
    )
  }
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!firstName) errors.firstName = 'first name  is a required field'

  if (!lastName) errors.lastName = 'last name is a required field'

  if (!email) errors.email = 'email is a required field'
  else if (!emailValidator.validate(email)) errors.email = 'invalid email'

  return errors
}

export default reduxForm({
  form: 'person',
  validate
})(NewPersonForm)
