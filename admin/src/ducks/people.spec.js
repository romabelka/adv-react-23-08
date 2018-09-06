import firebase from 'firebase/app'
import {
  addPersonSaga,
  ADD_PERSON_SUCCESS,
  ADD_PERSON_REQUEST,
  ADD_PERSON_START
} from './people'
import { call, put } from 'redux-saga/effects'
import { reset } from 'redux-form'

describe('People Saga', () => {
  it('should return response with id for a person', () => {
    const person = {
      firstName: 'Roman',
      lastName: 'Yakobchuk',
      email: 'r.yakobchuk@javascript.info'
    }
    const action = {
      type: ADD_PERSON_REQUEST,
      payload: { person }
    }
    const response = { key: 'KEY' }
    const process = addPersonSaga(action)

    expect(process.next().value).toEqual(
      put({
        type: ADD_PERSON_START
      })
    )

    const peopleRef = firebase.database().ref('people')

    expect(process.next().value).toEqual(
      call([peopleRef, peopleRef.push], {
        ...action.payload.person
      })
    )

    expect(process.next(response).value).toEqual(
      put({
        type: ADD_PERSON_SUCCESS,
        payload: {
          person: { id: response.key, ...person }
        }
      })
    )

    expect(process.next().value).toEqual(put(reset('person')))

    expect(process.next().done).toBe(true)
  })
})
