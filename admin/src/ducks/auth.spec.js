import {
  signUpSaga,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR,
  signInSaga,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_LIMIT
} from './auth'
import firebase from 'firebase/app'
import { apply, call, take, put } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { runSaga } from 'redux-saga'

describe('Auth Saga', () => {
  test('should try to signup user', () => {
    const auth = firebase.auth()
    const person = {
      password: 'aldsjf',
      email: '2@mali.com'
    }
    const action = {
      type: SIGN_UP_REQUEST,
      payload: { person }
    }

    const process = cloneableGenerator(signUpSaga)(action)
    expect(process.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        action.payload.email,
        action.payload.password
      )
    )

    const user = {}
    let clone = process.clone()
    expect(clone.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )
    expect(clone.next().done).toBe(true)

    clone = process.clone()
    const error = 'error'
    expect(clone.throw(error).value).toEqual(
      put({
        type: SIGN_UP_ERROR,
        error
      })
    )
    expect(clone.next().done).toBe(true)
  })

  test('should try to signin user', () => {
    const auth = firebase.auth()
    const user = {
      password: 'aldsjf',
      email: '2@mali.com'
    }
    const action = {
      type: SIGN_IN_REQUEST,
      payload: { user }
    }

    const process = cloneableGenerator(signInSaga)()
    for (let i = 0; i < 3; i++) {
      expect(process.next(action).value).toEqual(take(SIGN_IN_REQUEST))
      expect(process.next(action).value).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, [
          action.payload.email,
          action.payload.password
        ])
      )

      expect(process.next(user).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )

      const clone = process.clone()
      const error = 'error'
      expect(clone.throw(error).value).toEqual(
        put({
          type: SIGN_IN_ERROR,
          error
        })
      )
    }

    expect(process.next().value).toEqual(put({ type: SIGN_IN_LIMIT }))
    expect(process.next().done).toBe(true)
  })
})
