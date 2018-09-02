import { appName } from '../config'
import { Record, Map } from 'immutable'
import { takeEvery, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { fetchData } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const GET_EVENTS_REQUEST = `${prefix}/GET_EVENTS_REQUEST`
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`
export const GET_EVENTS_ERROR = `${prefix}/GET_EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new Map(),
  loading: true,
  error: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS_SUCCESS:
      return state
        .set('entities', new Map({ ...payload.events }))
        .set('loading', false)
    case GET_EVENTS_ERROR:
      return state.set('error', payload.error).set('loading', false)
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]

export const eventsSelector = createSelector(stateSelector, (state) =>
  state.entities.entrySeq().toArray()
)

export const errorSelector = createSelector(
  stateSelector,
  (state) => state.error
)

export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)

/**
 * Sagas
 **/

export function* getEventsSaga(action) {
  try {
    const events = yield call(fetchData, 'events')
    yield put({
      type: GET_EVENTS_SUCCESS,
      payload: { events }
    })
  } catch (error) {
    yield put({
      type: GET_EVENTS_ERROR,
      payload: { error: error.message }
    })
  }
}

export function* saga() {
  yield takeEvery(GET_EVENTS_REQUEST, getEventsSaga)
}
