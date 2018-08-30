import React, { Component } from 'react'
import { authorizedRoute } from '../HOCs/authorizedRoute/authorizedRoute'

class AdminRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Admin</h2>
      </div>
    )
  }
}

export default authorizedRoute(AdminRoute)
