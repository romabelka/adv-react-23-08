import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'

class AddUserForm extends Component {
  render() {
    return (
      <div>
        <h3>Add User Form</h3>
        <form onSubmit={this.props.handleSubmit}>
          <Field name="email" label="Email" component={ErrorField} />
          <Field name="firstName" label="First Name" component={ErrorField} />
          <Field name="lastName" label="Last Name" component={ErrorField} />
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'addUser'
})(AddUserForm)
