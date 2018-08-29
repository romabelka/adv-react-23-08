import React, { Component } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import ErrorField from '../common/error-field'
import emailValidator from 'email-validator'

class UserForm extends Component {
  render() {
    return (
      <div className="user_form">
        <h3>Add user</h3>
        <form onSubmit={this.props.handleSubmit}>
          <Field name="firstName" label="First Name" component={ErrorField} />
          <Field name="lastName" label="Last Name" component={ErrorField} />
          <Field name="email" label="Email" component={ErrorField} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const afterSubmit = (result, dispatch) => dispatch(reset('user'))

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!firstName) errors.firstName = 'First name is required field'
  else if (/w+/gi.test(firstName))
    errors.firstName = 'First name must contain only alphabetic symbols'

  if (!lastName) errors.lastName = 'Last name is required field'
  else if (/w+/gi.test(lastName))
    errors.lastName = 'Last name must contain only alphabetic symbols'

  if (!email) errors.email = 'Email is required field'
  else if (!emailValidator.validate(email)) errors.email = 'invalid email'

  return errors
}

export default reduxForm({
  form: 'user',
  onSubmitSuccess: afterSubmit,
  validate
})(UserForm)
