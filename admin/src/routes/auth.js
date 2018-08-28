import React, { Component, Fragment } from 'react'
import { NavLink, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../components/auth/sign-in-form'
import SignUpForm from '../components/auth/sign-up-form'
import { signUp, signIn, signOut } from '../ducks/auth'

class AuthRoute extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Auth Page</h2>
        {this.navMenu}
        <Route path="/auth/sign-in" render={this.signInForm} />
        <Route path="/auth/sign-up" render={this.signUpForm} />
        <Route path="/auth/sign-out" render={this.doSignOut} />
      </div>
    )
  }

  get navMenu() {
    if (this.props.currentUser) {
      return (
        <div>
          <NavLink to="/auth/sign-out" activeStyle={{ color: 'red' }}>
            Sign Out
          </NavLink>
        </div>
      )
    } else {
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
  }

  signInForm = () => <SignInForm onSubmit={this.handleSignIn} />
  signUpForm = () => <SignUpForm onSubmit={this.handleSignUp} />
  doSignOut = () => {
    this.props.signOut()
    return null
  }

  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}

const mapStateToProps = (state) => {
  return { currentUser: state.auth.user }
}

export default connect(
  mapStateToProps,
  { signUp, signIn, signOut }
)(AuthRoute)
