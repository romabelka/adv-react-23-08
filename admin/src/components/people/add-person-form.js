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

const validate = ({ email, lastName, firstName }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  else if (!emailValidator.validate(email)) errors.email = 'invalid email'

  if (!lastName) errors.lastName = 'Last Name is a required field'
  else if (lastName.length < 2) errors.lastName = 'Last name is too short'

  if (!firstName) errors.firstName = 'First Name is a required field'
  else if (firstName.length < 3) errors.firstName = 'First name is too short'

  return errors
}

export default reduxForm({
  form: 'people',
  validate
})(AddPersonForm)
