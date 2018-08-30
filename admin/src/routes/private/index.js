import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ isAuth, ...props }) =>
  isAuth ? <Route {...props} /> : <Redirect to="/auth" />

export default PrivateRoute
