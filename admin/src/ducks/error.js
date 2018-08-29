import { appName } from '../config'
import { Record } from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'error'
const prefix = `${appName}/${moduleName}`

export const API_FAILURE = `${prefix}/API_FAILURE`

/**
 * Reducer
 * */
export const ErrorRecord = Record({
  message: null,
  stack: null
})

export default function reducer(state = new ErrorRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case API_FAILURE:
      return state.set('message', payload.message).set('stack', payload.stack)

    default:
      return state
  }
}

/**
 * Action Creators
 * */

export function apiError(error) {
  return { type: API_FAILURE, payload: error, error: true }
}
