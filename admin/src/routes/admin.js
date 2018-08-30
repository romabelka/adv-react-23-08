import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddUserForm from '../components/admin/add-user-form'
import { addUser } from '../ducks/admin'
import { isSignedIn } from '../ducks/auth'

class AdminRoute extends Component {
  static propTypes = {}

  render() {
    const { isSignedIn } = this.props

    return (
      <div>
        <h2>Admin</h2>
        <hr />
        {isSignedIn ? (
          <AddUserForm onSubmit={this.handleUser} />
        ) : (
          <b>Sign in first</b>
        )}
      </div>
    )
  }

  handleUser = ({ firstName, lastName, email }) =>
    this.props.addUser(email, firstName, lastName)
}
const mapStateToProps = (state) => ({
  isSignedIn: isSignedIn(state)
})

export default connect(
  mapStateToProps,
  { addUser }
)(AdminRoute)
