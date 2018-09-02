import {
  signUpSaga,
  signInSaga,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_LIMIT
} from './auth'
import { call, put, apply, take } from 'redux-saga/effects'
import firebase from 'firebase'

const testUser = {
  email: 'test@test.com',
  password: 'qwerty123'
}

const auth = firebase.auth()

describe('Sign up saga', () => {
  it('should create new user in firebase', () => {
    const action = {
      type: SIGN_UP_REQUEST,
      payload: testUser
    }

    const process = signUpSaga(action)

    const expected = call(
      [auth, auth.createUserWithEmailAndPassword],
      testUser.email,
      testUser.password
    )

    expect(process.next().value).toEqual(expected)

    expect(process.next(testUser).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user: testUser }
      })
    )

    expect(process.next().done).toBe(true)
  })

  it('should return error', () => {
    const action = {
      type: SIGN_UP_REQUEST,
      payload: testUser
    }
    const process = signUpSaga(action)
    const error = 'Some error'

    process.next()
    expect(process.throw(error).value).toEqual(
      put({
        type: SIGN_UP_ERROR,
        error
      })
    )
    expect(process.next().done).toBe(true)
  })
})

describe('Sign in saga', () => {
  it('should sign in user', () => {
    const actionCreator = (user) => ({
      type: SIGN_IN_REQUEST,
      payload: user
    })

    const process = signInSaga()

    for (let i = 0; i < 3; i++) {
      expect(process.next().value).toEqual(take(SIGN_IN_REQUEST))

      const expected = apply(auth, auth.signInWithEmailAndPassword, [
        testUser.email,
        testUser.password
      ])

      expect(process.next(actionCreator(testUser)).value).toEqual(expected)

      expect(process.next(testUser).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user: testUser }
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
