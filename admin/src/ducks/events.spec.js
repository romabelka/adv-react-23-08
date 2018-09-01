import { apply, call, put, take } from 'redux-saga/effects'
import '../config'
import firebase from 'firebase/app'

import {
  SIGN_IN_LIMIT,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  signIn,
  signInSaga,
  signUp,
  signUpSaga
} from './auth'

describe('Auth Saga', () => {
  const auth = firebase.auth()

  afterAll(() => {
    console.log('afterall')
  })

  it('should signup', () => {
    const action = signUp('test@test.com', 'test')
    const process = signUpSaga(action)
    expect(process.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        action.payload.email,
        action.payload.password
      )
    )

    const user = {}
    expect(process.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: {
          user
        }
      })
    )

    expect(process.next().done).toBe(true)
  })
  it('should fire limit ', () => {
    const process = signInSaga()
    for (let i = 0; i < 3; i++) {
      expect(process.next().value).toEqual(take(SIGN_IN_REQUEST))
      expect(process.next(signIn('test@test.com', 'test')).value).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, ['test@test.com', 'test'])
      )
      expect(process.next({}).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user: {} }
        })
      )
    }
    expect(process.next().value).toEqual(
      put({
        type: SIGN_IN_LIMIT
      })
    )
  })
})
