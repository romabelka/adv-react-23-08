import React, { Component } from 'react'

class UsersList extends Component {
  render() {
    return (
      <div>
        {this.props.users.map((user) => (
          <li key={user.email}>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </div>
    )
  }
}

export default UsersList
