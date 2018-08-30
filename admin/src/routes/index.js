import React from 'react'

import { Route } from 'react-router-dom'
import PrivateRoute from './private'
import AuthRoute from './auth'
import AdminRoute from './admin'

const Routes = ({ auth }) => (
  <div>
    <Route path="/auth" component={AuthRoute} />
    <PrivateRoute
      isAuth={auth.user !== null}
      path="/admin"
      component={AdminRoute}
    />
  </div>
)

export default Routes
