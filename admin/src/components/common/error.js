import React from 'react'
import { connect } from 'react-redux'
import { moduleName as errorModule } from '../../ducks/error'

function Error({ error }) {
  console.log('error', error)
  return error ? <p style={{ color: 'red' }}>{error.message}</p> : null
}

export default connect(({ [errorModule]: error }) => ({ error }))(Error)
