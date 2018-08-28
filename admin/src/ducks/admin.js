import { appName } from '../config'
import { Record } from 'immutable'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

export const USER_COLUMNS = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email'
}

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  users: []
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER:
      return state.set('users', [...state.users, payload])

    default:
      return state
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const addUser = (user) => (dispatch) => {
  debugger
  dispatch({
    type: ADD_USER,
    payload: user
  })
}
