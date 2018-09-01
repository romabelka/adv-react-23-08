import { signUpSaga, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './auth'
import { call, put } from 'redux-saga/effects'
import firebase from 'firebase'

describe('Sign up saga', () => {
  it('should create new user in firebase', () => {
    const auth = firebase.auth()

    const testUser = {
      email: 'test@test.com',
      password: 'qwerty123'
    }

    const action = {
      type: SIGN_UP_SUCCESS,
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
    const testUser = {
      email: null,
      password: null
    }
    const action = {
      type: SIGN_UP_SUCCESS,
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
  })
})
