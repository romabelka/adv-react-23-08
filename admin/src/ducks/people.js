import { appName } from '../config'
import { Record, List } from 'immutable'
// import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const CREATE_PERSON = `${prefix}/CREATE_PERSON`

/**
 * Reducer
 * */
export const ReducerList = List

const PersonRecord = Record({
  firstName: null,
  lastName: null,
  email: null
})
export default function reducer(state = new ReducerList(), action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_PERSON:
      return state.push(new PersonRecord(payload))

    default:
      return state
  }
}

export const cleanForm = {
  person: (state, action) => {
    switch (action.type) {
      case CREATE_PERSON:
        return undefined
      default:
        return state
    }
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export function createPerson(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: CREATE_PERSON,
      payload: { firstName, lastName, email }
    })
  }
}
