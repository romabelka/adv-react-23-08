import React, { Component } from 'react'

class UsersList extends Component {
  getUser = (user) => (
    <div
      key={user.id}
      style={{
        border: '1px solid black',
        margin: '5px',
        maxWidth: '400px'
      }}
    >
      {Object.entries(user).map(this.getUserProps)}
    </div>
  )

  getUserProps = ([prop, value]) => <div key={prop}>{`${prop}: ${value}`}</div>

  render() {
    const { users } = this.props
    return <div>{users.map(this.getUser)}</div>
  }
}

export default UsersList
