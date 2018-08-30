import { Record, List } from 'immutable'
import shortid from 'shortid'

import { appName } from '../config'

export const moduleName = 'person'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON = `${prefix}/ADD_PERSON`

export const PersonRecord = Record({
  id: null,
  lastName: null,
  firstName: null,
  email: null
})

export default function reducer(state = List(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.push(new PersonRecord(payload))

    default:
      return state
  }
}

export function formReducer(state, { type }) {
  console.log('person form reduces', type, ADD_PERSON)
  switch (type) {
    case ADD_PERSON:
      return undefined

    default:
      return state
  }
}

/**
 * Actions Creators
 */

export function addPerson(firstName, lastName, email) {
  return {
    type: ADD_PERSON,
    payload: {
      id: shortid.generate(),
      firstName,
      lastName,
      email
    }
  }
}
