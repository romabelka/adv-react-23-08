import { appName } from '../config'
import { Record } from 'immutable'
import firebase from 'firebase/app'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
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
    case SIGN_OUT_SUCCESS:
      return state.remove('user')
    default:
      return state
  }
}

/**
 * Selectors
 * */

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
      .then((user) => {
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
        dispatch(reset('auth'))
      })
  }
}

export const signOut = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      //  debugger
      //  dispatch({
      //    type: SIGN_OUT_SUCCESS
      //  })
    })
}

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.store.dispatch({
      type: SIGN_OUT_SUCCESS
    })
  }
})
