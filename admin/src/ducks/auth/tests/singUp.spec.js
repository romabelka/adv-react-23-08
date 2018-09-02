import { SIGN_UP_SUCCESS, signUpSaga } from '../'
import { call, put } from 'redux-saga/effects'
import firebase from 'firebase/app'
import { USER } from './constants'

describe('Authentication Saga', () => {
  const auth = firebase.auth()

  it('user should sign up', () => {
    const process = signUpSaga({ payload: USER })

    expect(process.next().value).toEqual(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        USER.email,
        USER.password
      )
    )

    expect(process.next(USER).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user: USER }
      })
    )

    expect(process.next().done).toBe(true)
  })
})
