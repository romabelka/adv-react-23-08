import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../components/auth/sign-in-form'
import SignUpForm from '../components/auth/sign-up-form'
import { moduleName, signUp, signIn } from '../ducks/auth'
import { Redirect } from 'react-router-dom'

class AuthRoute extends Component {
  static propTypes = {}

  // TODO: extract into HOC
  get authorized() {
    return !!this.props.currentUser
  }

  render() {
    if (this.authorized) {
      return <Redirect to="/admin" />
    } else {
      return (
        <div>
          <h2>Auth Page</h2>
          {this.navMenu}
          <Route path="/auth/sign-in" render={this.signInForm} />
          <Route path="/auth/sign-up" render={this.signUpForm} />
        </div>
      )
    }
  }

  get navMenu() {
    return (
      <Fragment>
        <div>
          <NavLink to="/auth/sign-in" activeStyle={{ color: 'red' }}>
            Sign In
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-up" activeStyle={{ color: 'red' }}>
            Sign Up
          </NavLink>
        </div>
      </Fragment>
    )
  }

  signInForm = () => <SignInForm onSubmit={this.handleSignIn} />
  signUpForm = () => <SignUpForm onSubmit={this.handleSignUp} />

  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}

export default connect(
  ({ [moduleName]: auth }) => ({ currentUser: auth.user }),
  { signUp, signIn }
)(AuthRoute)
