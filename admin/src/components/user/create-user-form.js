import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class CreateUserForm extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h3>Create User Form</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            First Name: <Field name="firstName" component="input"/>
          </div>
          <div>
            Last Name: <Field name="lastName" component="input"/>
          </div>
          <div>
            Email: <Field name="email" component="input"/>
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'createUser'
})(CreateUserForm)