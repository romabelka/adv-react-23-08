import React, { Component } from 'react'
import { reduxForm, Field, Form } from 'redux-form'
import { v4 } from 'uuid'

const fieldsConfig = [
  { name: 'firstName', type: 'text' },
  { name: 'lastName', type: 'text' },
  { name: 'email', type: 'email' }
].map((c) => ({ ...c, key: v4() }))
const initialValues = fieldsConfig.reduce(
  (acc, { name }) => ({ ...acc, [name]: '' }),
  {}
)
const validate = (user) =>
  !Object.entries(user)
    .map(([key, value]) => value)
    .every(Boolean) && { _error: 'all fields are required' }

class UserForm extends Component {
  getField = (config) => (
    <div key={config.key}>
      {config.name}:<Field {...config} component="input" />
    </div>
  )

  submit = (user) => {
    const { onSubmit, reset } = this.props

    onSubmit(user)
    reset()
  }

  render() {
    const { handleSubmit, error, submitFailed, reset } = this.props

    return (
      <Form onSubmit={handleSubmit(this.submit)} noValidate>
        {fieldsConfig.map(this.getField)}
        <div style={{ color: 'red' }}>{submitFailed && error}</div>
        <div>
          <button type="button" onClick={reset}>
            reset
          </button>
          <button type="submit">save</button>
        </div>
      </Form>
    )
  }
}

UserForm.formName = 'userForm'
UserForm.propTypes = {}
UserForm.defaultProps = {}

export default reduxForm({
  validate,
  initialValues,
  form: UserForm.formName
})(UserForm)
