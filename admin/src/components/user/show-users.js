import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../ducks/users'

class UserList extends Component {
  render() {
    const users = this.props.users.map(
      ({ firstName: first, lastName: last, email }) => {
        return (
          <li key={email}>
            {first} {last} (email: {email})
          </li>
        )
      }
    )
    return <ul>{users}</ul>
  }
}

export default connect(getUsers)(UserList)
