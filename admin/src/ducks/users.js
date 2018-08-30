import { appName } from '../config'
import { Record, Map, List } from 'immutable'
import { v4 } from 'uuid'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const CREATE_USER_SUCCESS = `${prefix}/CREATE_USER_SUCCESS`

/**
 * Reducer
 * */
function byIds(state = Map(), { type, payload }) {
  switch (type) {
    case CREATE_USER_SUCCESS:
      return state.set(payload.id, Map(payload))
    default:
      return state
  }
}

function ids(state = List(), { type, payload }) {
  switch (type) {
    case CREATE_USER_SUCCESS:
      return state.push(payload.id)
    default:
      return state
  }
}

export default combineReducers({ byIds, ids })

/**
 * Selectors
 * */

const getState = (state) => state[moduleName]
const getEntities = (state) => getState(state).byIds
const getResult = (state) => getState(state).ids

export const getUsers = createSelector(
  getEntities,
  getResult,
  (entities, result) => {
    const jsEntities = entities.toJS()
    return result.toJS().map((id) => jsEntities[id])
  }
)

/**
 * Action Creators
 * */

export const createUser = (userDto) => ({
  type: CREATE_USER_SUCCESS,
  payload: {
    ...userDto,
    id: v4()
  }
})
