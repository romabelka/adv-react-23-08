import { appName } from '../config'
import { Map, List, Record } from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = List

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state.push(payload)

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

export function addPerson(firstName, lastName, email) {
  return (dispatch) =>
    dispatch({
      type: ADD_PERSON_SUCCESS,
      payload: { firstName, lastName, email }
    })
}
