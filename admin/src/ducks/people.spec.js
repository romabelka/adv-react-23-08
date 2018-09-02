import { addPersonSaga, ADD_PERSON_SUCCESS, ADD_PERSON_REQUEST } from './people'
import {
  signUpSaga,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR
} from './auth'
import firebase from 'firebase/app'
import { generateId } from './utils'
import { call, put } from 'redux-saga/effects'
import { reset } from 'redux-form'

describe('People Saga', () => {
  it('should generate id for a person', () => {
    const person = {
      firstName: 'Roman',
      lastName: 'Yakobchuk',
      email: 'r.yakobchuk@javascript.info'
    }
    const action = {
      type: ADD_PERSON_REQUEST,
      payload: { person }
    }
    const process = addPersonSaga(action)

    expect(process.next().value).toEqual(call(generateId))

    const id = generateId()

    expect(process.next(id).value).toEqual(
      put({
        type: ADD_PERSON_SUCCESS,
        payload: {
          person: { id, ...person }
        }
      })
    )

    expect(process.next().value).toEqual(put(reset('person')))

    expect(process.next().done).toBe(true)
  })
})
