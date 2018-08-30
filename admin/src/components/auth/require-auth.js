import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isSignedIn } from '../../ducks/auth'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    static propTypes = {
      authenticated: PropTypes.bool
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.history.push('/auth')
      }
    }

    render() {
      console.log('req auth', this.context)
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: isSignedIn(state)
  })

  return connect(
    mapStateToProps,
    null
  )(Authentication)
}
