import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class AddPersonForm extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h3>Add Person Form</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field name="firstName" label="First Name" component={ErrorField} />
          </div>
          <div>
            <Field name="lastName" label="Last Name" component={ErrorField} />
          </div>
          <div>
            <Field name="email" label="Email" component={ErrorField} />
          </div>
          <button type="submit">Add Person</button>
        </form>
      </div>
    )
  }
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!firstName) errors.firstName = 'firstName is a required field'
  else if (firstName.length < 2) errors.firstName = 'firstName to short'

  if (!lastName) errors.lastName = 'lastName is a required field'
  else if (lastName.length < 2) errors.lastName = 'lastName to short'

  if (!email) errors.email = 'email is a required field'
  else if (!emailValidator.validate(email)) errors.email = 'invalid email'

  return errors
}

export default reduxForm({
  form: 'admin',
  validate
})(AddPersonForm)
