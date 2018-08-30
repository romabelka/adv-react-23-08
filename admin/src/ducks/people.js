import { appName } from '../config'
import { Record } from 'immutable'
import { List } from 'immutable'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON = `${prefix}/ADD_PERSON`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  people: List()
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.people.push({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email
      })

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
      type: ADD_PERSON,
      payload: { firstName, lastName, email }
    })
}
