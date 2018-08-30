import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserList extends Component {
  render() {
    return (
      <div className="users_list">
        <h3>Users list</h3>
        <ul>{this.renderList}</ul>
      </div>
    )
  }

  get renderList() {
    const { users } = this.props

    return users.map((item) => {
      return (
        <li key={item.email}>
          <b>
            {item.firstName} {item.lastName}
          </b>{' '}
          ({item.email})
        </li>
      )
    })
  }
}

const mapStateToProps = (store) => {
  return {
    users: store.users
  }
}

export default connect(mapStateToProps)(UserList)
