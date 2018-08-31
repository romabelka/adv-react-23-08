import React, { Component, Fragment } from 'react'
import { reduxForm, Field, reset } from 'redux-form'

class AddUserForm extends Component {
  render() {
    return (
      <Fragment>
        <h3>Add User Form</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            First name: <Field name="firstName" component="input" />
          </div>
          <div>
            Last name: <Field name="lastName" component="input" />
          </div>
          <div>
            Email: <Field name="email" component="input" />
          </div>
          <button type="submit">Add the User</button>
        </form>
      </Fragment>
    )
  }
}

const FORM_NAME = 'addUser'

const onSubmitSuccess = (result, dispatch) => dispatch(reset(FORM_NAME))

export default reduxForm({
  form: FORM_NAME,
  onSubmitSuccess
})(AddUserForm)
