import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_LIMIT,
  signInSaga
} from '../'
import { call, put, take } from 'redux-saga/effects'
import firebase from 'firebase/app'
import { USER } from './constants'

describe('Authentication Saga', () => {
  const auth = firebase.auth()

  it('user should sign in', () => {
    const process = signInSaga()
    /**
     * Как это можно было бы сделать декларативно?
     * */
    for (let i = 0; i < 3; i++) {
      expect(process.next().value).toEqual(take(SIGN_IN_REQUEST))

      expect(process.next({ payload: USER }).value).toEqual(
        call([auth, auth.signInWithEmailAndPassword], USER.email, USER.password)
      )

      expect(process.next(USER).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user: USER }
        })
      )
    }

    expect(process.next().value).toEqual(
      put({
        type: SIGN_IN_LIMIT
      })
    )

    expect(process.next().done).toBe(true)
  })
})
