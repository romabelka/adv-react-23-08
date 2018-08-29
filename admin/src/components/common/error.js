import React from 'react'
import { connect } from 'react-redux'

function Error({ error }) {
  return error ? <p style={{ color: 'red' }}>{error.message}</p> : null
}

export default connect(({ error }) => ({ error }))(Error)
