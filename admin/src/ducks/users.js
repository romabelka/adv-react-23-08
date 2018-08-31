import { appName } from '../config'
import { OrderedMap, Record } from 'immutable'

///
/// Constants
///

export const moduleName = 'users'

const prefix = `${appName}/${moduleName}`

const ADD_USER = `${prefix}/ADD_USER`

///
/// Reducer
///

const UserRecord = Record({ firstName: null, lastName: null, email: null })
const UsersOrderedMap = new OrderedMap()

export default function reducer(state = UsersOrderedMap, action) {
  const { type } = action

  switch (type) {
    case ADD_USER:
      const {
        payload: { firstName, lastName, email }
      } = action
      return state.set(email, new UserRecord({ firstName, lastName, email }))

    default:
      return state
  }
}

///
/// Selectors
///

///
/// Action Creators
///

export function addUser({ firstName, lastName, email }) {
  return { type: ADD_USER, payload: { firstName, lastName, email } }
}

///
/// Redux Form plugins
///

export const userFormPlugin = {
  user: (state, action) => {
    switch (action.type) {
      case ADD_USER:
        return undefined // <--- blow away form data
      default:
        return state
    }
  }
}
