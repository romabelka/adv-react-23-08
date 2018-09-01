import { signUpSaga, signInSaga } from './auth'
import { put, take, apply, call } from 'redux-saga/effects'
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_LIMIT,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR
} from '../ducks/auth'
import firebase from 'firebase/app'

describe('Auth saga', () => {
  const payload = { email: 'test@example.com', password: 'password' }
  const user = { email: payload.email }
  const fbAuth = firebase.auth()

  describe('Sign in saga', () => {
    it('should dispatch an appropriate action when sign in limit is exceeded', () => {
      const saga = signInSaga(1) // only 1 iteration
      saga.next() // start generator
      saga.next({ payload })
      saga.throw(new Error('Something went wrong')) // skipping to the 'catch' block
      expect(saga.next().value).toEqual(
        put({
          type: SIGN_IN_LIMIT
        })
      )
    })

    it('should execute a successful sign in sequence', () => {
      const saga = signInSaga()
      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST)) // start generator
      expect(saga.next({ payload }).value).toEqual(
        apply(fbAuth, fbAuth.signInWithEmailAndPassword, [
          payload.email,
          payload.password
        ])
      )
      expect(saga.next(user).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )
    })

    it('should execute a failing sign in sequence', () => {
      const saga = signInSaga()
      saga.next() // start generator
      saga.next({ payload }) // enter 'try' block
      const error = new Error('Something went wrong')
      expect(saga.throw(error).value).toEqual(
        put({
          type: SIGN_IN_ERROR,
          error
        })
      )
    })
  })

  describe('Sign up saga', () => {
    it('should execute a successful sign in sequence', () => {
      const saga = signUpSaga({ payload })
      expect(saga.next(user).value).toEqual(
        call(
          [fbAuth, fbAuth.createUserWithEmailAndPassword],
          payload.email,
          payload.password
        )
      )
      expect(saga.next(user).value).toEqual(
        put({
          type: SIGN_UP_SUCCESS,
          payload: { user }
        })
      )
    })

    it('should execute a failing sign up sequence', () => {
      const saga = signUpSaga({ payload })
      saga.next() // start generator
      saga.next(user) // enter 'try' block
      const error = new Error('Something went wrong')
      expect(saga.throw(error).value).toEqual(
        put({
          type: SIGN_UP_ERROR,
          error
        })
      )
    })
  })

  // TODO: how do I test this?
  // export function* saga() {
  //   yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
  // }
})
