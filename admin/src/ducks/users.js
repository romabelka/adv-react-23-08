import { appName } from '../config'
import { Record, Map, List } from 'immutable'
import { v4 } from 'uuid'
import { createSelector } from 'reselect'
/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const CREATE_USER = `${prefix}/CREATE_USER`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  usersById: Map(),
  userIds: List()
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_USER: {
      const { id } = payload
      const usersById = state.get('usersById').set(id, Map(payload))
      const userIds = state.get('userIds').push(id)

      return state.set('usersById', usersById).set('userIds', userIds)
    }
    default:
      return state
  }
}

/**
 * Selectors
 * */

const getState = (state) => state[moduleName]
export const getUsers = createSelector(getState, (users) => {
  const usersObj = users.toJS()

  return usersObj.userIds.map((id) => usersObj.usersById[id])
})

/**
 * Action Creators
 * */

export const createUser = (userDto) => ({
  type: CREATE_USER,
  payload: {
    ...userDto,
    id: v4()
  }
})
