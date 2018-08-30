import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class AddUserForm extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h3>Add User Form</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            First Name: <Field name="firstName" component="input" />
          </div>
          <div>
            Second Name: <Field name="secondName" component="input" />
          </div>
          <div>
            Email: <Field name="email" component="input" />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'admin'
})(AddUserForm)
