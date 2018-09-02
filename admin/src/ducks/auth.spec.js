import { signUpSaga, SIGN_UP_SUCCESS, SIGN_UP_REQUEST } from './auth'
import { call, put } from 'redux-saga/effects'
import { reset } from 'redux-form'

describe('People Saga', () => {
  it('should sign up person', () => {
    const signData = {
      password: 'qwerqwert',
      email: 'lordwalmar@javascript.info'
    }
    const action = {
      type: SIGN_UP_REQUEST,
      payload: signData
    }
    const process = signUpSaga(action)

    expect(process.next().value['CALL']['args']).toEqual([
      signData.email,
      signData.password
    ])

    const user = {
      firstName: 'lordWalmar'
    }
    expect(process.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )
    expect(process.next().done).toBe(true)
  })
})
