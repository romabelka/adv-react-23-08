import { appName } from '../config'
import { Record } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  isAuthorized: false,
  isInitialized: false
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return state
        .set('user', payload.user)
        .set('isInitialized', true)
        .set('isAuthorized', true)

    default:
      return state
  }
}

/**
 * Selectors
 * */

const getState = (state) => state[moduleName]
export const getIsInitialized = createSelector(getState, (auth) =>
  auth.get('isInitialized')
)
export const getIsAuthorized = createSelector(getState, (auth) =>
  auth.get('isAuthorized')
)

/**
 * Action Creators
 * */

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

export function signIn(email, password) {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) =>
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )
  }
}

firebase.auth().onAuthStateChanged((user) => {
  window.store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })
})
