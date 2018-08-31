import { appName } from '../config'
import { Record } from 'immutable'

export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

// Reducers
export const ReduceRecord = Record({
  users: []
})

export default function reducer(state = new ReduceRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER:
      return state.set('users', state.users.concat([payload]))
    default:
      return state
  }
}

// Thunk Action Creators

export function addUser(firstName, lastName, email) {
  return {
    type: ADD_USER,
    payload: { firstName, lastName, email }
  }
}

// Get States

export function getUsers(state) {
  return {
    users: state.users.users
  }
}
