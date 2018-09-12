import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import firebase from 'firebase/app'
import {
  call,
  put,
  takeEvery,
  take,
  all,
  apply,
  spawn
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_IN_LIMIT = `${prefix}/SIGN_IN_LIMIT`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return state.set('user', payload.user)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const userSelector = (state) => state[moduleName].user
export const isAuthorizedSelector = createSelector(
  userSelector,
  (user) => !!user
)

/**
 * Action Creators
 * */

export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

/**
 * Sagas
 **/

export const authStateChanelCreator = () =>
  eventChannel((emit) => {
    firebase.auth().onAuthStateChanged((user) => emit(user))

    return () => {
      console.log('event off')
    }
  })

export function* authStateHandler(user) {
  yield put({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })
}

export function* authStateManager() {
  const authStateChannel = yield authStateChanelCreator()
  yield takeEvery(authStateChannel, authStateHandler)
}

export function* signUpSaga({ payload }) {
  const auth = firebase.auth()

  try {
    yield call(
      [auth, auth.createUserWithEmailAndPassword],
      payload.email,
      payload.password
    )
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error
    })
  }
}

export function* signInSaga() {
  for (let i = 0; i < 3; i++) {
    const {
      payload: { email, password }
    } = yield take(SIGN_IN_REQUEST)

    try {
      const auth = firebase.auth()

      yield apply(auth, auth.signInWithEmailAndPassword, [email, password])
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error
      })
    }
  }

  yield put({
    type: SIGN_IN_LIMIT
  })
}

export function* saga() {
  yield spawn(authStateManager)
  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
}
