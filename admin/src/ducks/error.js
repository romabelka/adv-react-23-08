import { appName } from '../config'
import { Record } from 'immutable'
import { LOCATION_CHANGE } from 'connected-react-router'

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
      const { message, stack } = payload
      return state.merge({ message, stack })

    case LOCATION_CHANGE:
      if (payload.location.state) {
        const redirectError = payload.location.state.error
        if (redirectError) {
          const { message, stack } = redirectError
          return state.merge({ message, stack })
        }
      }
      return state.merge({ message: null, stack: null })

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
