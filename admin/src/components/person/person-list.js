import React, { Component } from 'react'

class PersonList extends Component {
  static propTypes = {}

  render() {
    const { data } = this.props
    const isEmpty = !(data && data.size)

    return (
      <div>
        <h3>Person list</h3>
        {data.map(({ id, firstName, lastName, email }) => {
          return (
            <li key={id}>
              First name: {firstName}, last name: {lastName}, email: {email}
            </li>
          )
        })}
        {isEmpty && <p>List is empty</p>}
      </div>
    )
  }
}

export default PersonList
