import React from 'react'
import { connect } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { getIsAuthorized, getIsInitialized } from '../../ducks/auth'
import Unauthorized from '../../components/auth/Unathorized'
import Loading from '../../components/common/Loading'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
const mapStateToProps = (state) => ({
  isInitialized: getIsInitialized(state),
  isAuthorized: getIsAuthorized(state)
})

export const authorizedRoute = (Component) => {
  function AuthorizedRoute({ isAuthorized, isInitialized, ...rest }) {
    if (!isInitialized) return <Loading />

    return isAuthorized ? <Component {...rest} /> : <Unauthorized />
  }

  hoistNonReactStatics(AuthorizedRoute, Component)
  AuthorizedRoute.displayName = `AuthorizedRoute${getDisplayName(Component)}`

  return connect(mapStateToProps)(AuthorizedRoute)
}
