import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

let count = 0

const ProtectedRoute = ({
  authorized,
  component: Component,
  redirectTo = '/auth/sign-in',
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authorized ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const mapStateToProps = (state) => {
  return { authorized: !!state.auth.user }
}

export default withRouter(connect(mapStateToProps)(ProtectedRoute))
