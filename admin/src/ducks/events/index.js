import { appName } from '../../config'
import { Map } from 'immutable'
import firebase from 'firebase/app'
import { call, put, takeEvery, all } from 'redux-saga/effects'
import { SIGN_IN_SUCCESS } from '../auth'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const EVENTS_REQUEST = `${prefix}/EVENTS_REQUEST`
export const EVENTS_SUCCESS = `${prefix}/EVENTS_SUCCESS`
export const EVENTS_ERROR = `${prefix}/EVENTS_ERROR`

/**
 * Reducer
 * */
export const InitialState = {
  items: new Map()
}

export default function reducer(state = InitialState, action) {
  const { type, payload } = action

  switch (type) {
    case EVENTS_SUCCESS:
      return { ...state, items: new Map(payload) }
    default:
      return state
  }
}

/**
 * API
 * */

const getEvents = () =>
  firebase
    .database()
    .ref('/events')
    .once('value')
    .then((snap) => snap.val())

/**
 * Action Creators
 * */

export function getEventsRequest() {
  return {
    type: EVENTS_REQUEST
  }
}

export function getEventsSuccess(data) {
  return {
    type: EVENTS_SUCCESS,
    payload: data
  }
}

/**
 * Sagas
 **/

export function* getEventsSaga() {
  try {
    const events = yield call(getEvents)
    yield put(getEventsSuccess(events))
  } catch (error) {
    yield put({
      type: EVENTS_ERROR,
      error
    })
  }
}

export function* getEventsHandler() {
  yield put(getEventsRequest())
}

export function* saga() {
  yield all([
    takeEvery(EVENTS_REQUEST, getEventsSaga),
    takeEvery(SIGN_IN_SUCCESS, getEventsHandler)
  ])
}
