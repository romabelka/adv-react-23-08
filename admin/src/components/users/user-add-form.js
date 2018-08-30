import React, { Fragment } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import emailValidator from 'email-validator'

function UserAddForm({ handleSubmit }) {
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Field name="email" label="Email" component={ErrorField} />
        <Field name="firstName" label="First name" component={ErrorField} />
        <Field name="lastName" label="Last name" component={ErrorField} />
        <button type="submit">Add</button>
      </form>
    </Fragment>
  )
}

const validate = ({ email, firstName, lastName }, { emailExists }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  else if (emailExists(email)) errors.email = 'email already exists'
  else if (!emailValidator.validate(email)) errors.email = 'invalid email'

  if (!firstName) errors.firstName = 'first name is a required field'

  if (!lastName) errors.lastName = 'last name is a required field'

  return errors
}

export default reduxForm({
  form: 'userAdd',
  validate
})(UserAddForm)
