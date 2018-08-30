import { appName } from '../config'
import { Map } from 'immutable'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`

/**
 * Reducer
 * */

export default function reducer(state = Map(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER_SUCCESS:
      return state.set(payload.email, payload)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export function isSignedIn(state) {
  return !!state.auth && !!state.auth.user
}

/**
 * Action Creators
 * */

export function addUser(email, firstName, lastName) {
  return (dispatch) => {
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: {
        email,
        firstName,
        lastName
      }
    })
    dispatch(reset('admin'))
  }
}
