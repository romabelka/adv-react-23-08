import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class AddNewPersonForm extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h3>Add new person</h3>
        <form onSubmit={this.props.handleSubmit}>
          <Field name="fistName" label="First Name" component={ErrorField} />
          <Field name="lastName" label="Last Name" component={ErrorField} />
          <Field
            name="email"
            label="Email"
            type="email"
            component={ErrorField}
          />
          <button type="submit">Add new person</button>
        </form>
      </div>
    )
  }
}

const validate = ({ firstName, email }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  else if (!emailValidator.validate(email)) errors.email = 'invalid email'

  if (!firstName) errors.firstName = 'first name is a required field'

  return errors
}

export default reduxForm({
  form: 'person',
  validate
})(AddNewPersonForm)
