import { appName } from '../config'
import { Record, List } from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  firstName: null,
  lastName: null,
  email: null,
  usersList: new List([])
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER:
      return state
        .set('firstName', null)
        .set('lastName', null)
        .set('email', null)
        .update('usersList', (list) => list.push(payload.user))

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

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: { user }
  }
}
