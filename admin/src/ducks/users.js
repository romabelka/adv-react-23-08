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

// const UsersOrderedMap = new OrderedMap()

const UserRecord = Record({ firstName: null, lastName: null, email: null })

// TODO: remove in favor of real initial state (empty map)
const UsersOrderedMap = new OrderedMap({
  'foo@example.com': new UserRecord({
    firstName: 'John',
    lastName: 'Doe',
    email: 'foo@example.com'
  }),
  'bar@example.com': new UserRecord({
    firstName: 'Jane',
    lastName: 'Bar',
    email: 'bar@example.com'
  })
})

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
