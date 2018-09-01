import { appName } from '../config'
import { Map, Record } from 'immutable'
import { all, call, put, take, takeEvery } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { createAsyncAction } from './utils'
import firebase from 'firebase/app'
import { SIGN_IN_SUCCESS } from './auth'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const GET_EVENTS = createAsyncAction(`${prefix}/GET_EVENTS`)

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new Map({}),
  loaded: false,
  loading: false,
  error: null
})

const EventRecord = Record({
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS.REQUEST:
      // Или лучше без withMutations, просто state.set(..).set(..) ?
      return state.withMutations((newState) =>
        newState
          .set('loading', true)
          .set('loaded', false)
          .set('error', null)
      )
    case GET_EVENTS.SUCCESS:
      return state.withMutations((newState) =>
        newState
          .set('loading', false)
          .set('loaded', true)
          .set('entities', new Map(action.payload))
      )
    case GET_EVENTS.FAILURE:
      return state.withMutations((newState) =>
        newState
          .set('loading', false)
          .set('loaded', false)
          .set('error', action.payload)
      )
    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventSelector = createSelector(stateSelector, (state) =>
  state.entities.entrySeq()
)
export const loadingSelector = (state) => stateSelector(state).loading

/**
 * Action Creators
 * */
export const getEventsRequest = () => ({ type: GET_EVENTS.REQUEST })
export const getEventsSuccess = (events) => ({
  type: GET_EVENTS.SUCCESS,
  payload: events
})
export const getEventsFailure = (error) => ({
  type: GET_EVENTS.FAILURE,
  payload: error
})

/***
 * API
 */
const fetchEvents = () =>
  firebase
    .database()
    .ref('/events')
    .once('value')
    .then((snap) => snap.val())

/**
 * Sagas
 **/

export function* getEventsSaga() {
  try {
    const events = yield call(fetchEvents)
    yield put(getEventsSuccess(events))
  } catch (error) {
    yield put(getEventsFailure(error))
  }
}
export function* watchAuthSaga() {
  yield put(getEventsRequest())
}

export function* saga() {
  yield all([
    takeEvery(GET_EVENTS.REQUEST, getEventsSaga),
    takeEvery(SIGN_IN_SUCCESS, watchAuthSaga)
  ])
}
