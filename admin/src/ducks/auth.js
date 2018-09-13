import { appName } from '../config'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import firebase from 'firebase/app'
import {
  all,
  apply,
  call,
  put,
  spawn,
  take,
  takeEvery
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

export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`
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

/*
export function signUp(email, password) {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) =>
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: { user }
        })
      )
  }
}
*/

export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

// firebase.auth().onAuthStateChanged((user) => {
//   window.store.dispatch({
//     type: SIGN_IN_SUCCESS,
//     payload: { user }
//   })
// })

/**
 * Sagas
 **/

export function* signUpSaga({ payload }) {
  const auth = firebase.auth()

  try {
    const user = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      payload.email,
      payload.password
    )

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error
    })
  }
}
export const createAuthStateChannel = () =>
  eventChannel((emit) => {
    const callback = (user, error) =>
      emit({ user, error: error ? error : null })
    const unsubscribe = firebase.auth().onAuthStateChanged(callback)

    return () => unsubscribe()
  })

export function* signInSaga() {
  for (let i = 0; i < 3; i++) {
    const {
      payload: { email, password }
    } = yield take(SIGN_IN_REQUEST)

    try {
      const auth = firebase.auth()

      const user = yield apply(auth, auth.signInWithEmailAndPassword, [
        email,
        password
      ])

      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
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
export function* watchAuthState() {
  const channel = yield call(createAuthStateChannel)
  while (true) {
    const { user, error } = yield take(channel)

    if (user)
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    else if (error)
      yield put({
        type: SIGN_IN_ERROR,
        error
      })
    else
      yield put({
        type: SIGN_OUT_SUCCESS
      })
  }
}

export function* saga() {
  yield spawn(watchAuthState)

  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
}
