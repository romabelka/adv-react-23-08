import { appName } from '../config'
import { List } from 'immutable'

/**
 * Constants
 * */

export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */

export const ReducerList = List()

export default function reducer(state = ReducerList, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER:
      return state.push(payload.user)

    default:
      return state
  }
}

/**
 * Action Creators
 * */

export function addUser(firstName, lastName, email) {
  const user = { firstName, lastName, email }
  return {
    type: ADD_USER,
    payload: { user }
  }
}
