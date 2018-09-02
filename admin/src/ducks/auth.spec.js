import { call, put, take, apply } from 'redux-saga/effects'
import firebase from 'firebase/app'
import {
  signUp,
  signIn,
  signUpSaga,
  signInSaga,
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_LIMIT,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './auth'

const email = 'john@example.com'
const password = '12345678'
const user = { email }
Object.freeze(user)

describe('Auth saga', () => {
  it('shout return sign in action', () => {
    expect(signIn(email, password)).toEqual({
      type: SIGN_IN_REQUEST,
      payload: { email, password }
    })
  })

  it('shout return sign up action', () => {
    expect(signUp(email, password)).toEqual({
      type: SIGN_UP_REQUEST,
      payload: { email, password }
    })
  })

  it('should sign in', () => {
    const limit = 1
    const error = new Error()

    const action = {
      type: SIGN_IN_REQUEST,
      payload: { email, password }
    }

    const process = signInSaga(limit)
    const auth = firebase.auth()

    for (let i = 0; i < limit; i++) {
      expect(process.next(action).value).toEqual(take(SIGN_IN_REQUEST))

      expect(process.next(action).value).toEqual(
        apply(auth, auth.signInWithEmailAndPassword, [email, password])
      )

      expect(process.next(user).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )

      expect(process.throw(error).value).toEqual(
        put({
          type: SIGN_IN_ERROR,
          error
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

  it('should sign up', () => {
    const action = {
      type: SIGN_UP_REQUEST,
      payload: { email, password }
    }

    const auth = firebase.auth()
    const process = signUpSaga(action)
    expect(process.next().value).toEqual(
      call([auth, auth.createUserWithEmailAndPassword], email, password)
    )
    expect(process.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )

    const error = new Error()
    expect(process.throw(error).value).toEqual(
      put({
        type: SIGN_UP_ERROR,
        error
      })
    )

    expect(process.next().done).toBe(true)
  })
})
