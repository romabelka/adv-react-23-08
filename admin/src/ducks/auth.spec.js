import { signInSaga } from './auth'
import { put } from 'redux-saga/effects'
import { SIGN_IN_LIMIT } from '../ducks/auth'

describe('Auth saga', () => {
  const payload = { email: 'test@example.com', password: 'password' }

  it('should dispatch an appropriate action when sign in limit is exceeded', () => {
    const saga = signInSaga(1) // only 1 iteration
    saga.next() // start generator
    saga.next({ payload })
    saga.throw(new Error('Something went wrong')) // skipping to the catch block
    expect(saga.next().value).toEqual(
      put({
        type: SIGN_IN_LIMIT
      })
    )
  })
})
