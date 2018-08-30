import { appName } from '../config'
import { Set } from 'immutable'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Set

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state.add(payload)

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
  return (dispatch) => {
    // firebase
    dispatch({
      type: ADD_PERSON_SUCCESS,
      payload: { firstName, lastName, email }
    })
    dispatch(reset('person'))
  }
}
