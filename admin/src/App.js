import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthRoute from './routes/auth'
import AdminRoute from './routes/admin'
import { signOut } from './ducks/auth'

class App extends Component {
  get menu() {
    return (
      <Fragment>
        {this.props.isAdminVisible ? (
          <div>
            <NavLink to="/admin" activeStyle={{ color: 'red' }}>
              admin
            </NavLink>
          </div>
        ) : null}
        <div>
          <NavLink to="/auth" activeStyle={{ color: 'red' }}>
            auth
          </NavLink>
        </div>
      </Fragment>
    )
  }
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        {this.menu}
        <br />
        <button onClick={this.onLogout}>Logout</button>
        <Route path="/admin" component={AdminRoute} />
        <Route path="/auth" component={AuthRoute} />
      </div>
    )
  }

  onLogout = () => {
    this.props.signOut()
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  const isAdminVisible = !!auth.user
  return {
    isAdminVisible
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { signOut }
  )(App)
)
