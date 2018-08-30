import React, { Component, Fragment } from 'react'
import Routes from './routes'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Menu extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <NavLink to="/admin" activeStyle={{ color: 'red' }}>
            admin
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth" activeStyle={{ color: 'red' }}>
            auth
          </NavLink>
        </div>
      </Fragment>
    )
  }
}

const AppComponent = ({ auth, router }) => {
  return (
    <div>
      <h1>Hello World</h1>
      <Menu />
      <Routes auth={auth} />
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
    router: state.router
  }
}

const App = connect(mapStateToProps)(AppComponent)

export default App
