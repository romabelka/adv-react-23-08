import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class EditUserForm extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h3>Edit User Form</h3>

      </div>
    )
  }
}

export default reduxForm({
  form: 'editUser'
})(EditUserForm)