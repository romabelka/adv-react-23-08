import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class PersonForm extends Component {
  static propTypes = {}

  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <h3>Person form</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="firstName" label="First name" component={ErrorField} />
          </div>
          <div>
            <Field name="lastName" label="Last name" component={ErrorField} />
          </div>
          <div>
            <Field
              name="email"
              label="Email"
              component={ErrorField}
              type="email"
            />
          </div>
          <button>Add person</button>
        </form>
      </div>
    )
  }
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!firstName) {
    errors.firstName = 'first name is a required field'
  }

  if (!lastName) {
    errors.lastName = 'last name is a required field'
  }

  if (!email) {
    errors.email = 'email is a required field'
  } else if (!emailValidator.validate(email)) {
    errors.email = 'invalid email'
  }

  return errors
}

export default reduxForm({
  form: 'person',
  validate
})(PersonForm)
