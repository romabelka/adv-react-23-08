import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { put, call, takeEvery } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { fetchEvents } from '../api/firebase'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const GET_EVENTS_REQUEST = `${prefix}/GET_EVENTS_REQUEST`
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`
export const GET_EVENTS_FAILED = `${prefix}/GET_EVENTS_FAILED`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new OrderedMap(),
  loading: false,
  error: null
})

const EventRecord = Record({
  id: null,
  title: null,
  url: null,
  where: null,
  when: null,
  submissionDeadline: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action

  switch (type) {
    case GET_EVENTS_REQUEST:
      return state.set('loading', true).set('error', null)

    case GET_EVENTS_SUCCESS:
      return state
        .set(
          'entities',
          new OrderedMap(payload.events).map(
            (item, key) => new EventRecord({ id: key, ...item })
          )
        )
        .set('loading', false)
        .set('error', null)

    case GET_EVENTS_FAILED:
      return state.set('loading', false).set('error', error)

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(stateSelector, (state) =>
  state.entities.valueSeq().toArray()
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const errorSelector = createSelector(
  stateSelector,
  (state) => state.error
)

/**
 * Action Creators
 * */
export const getEvents = () => ({
  type: GET_EVENTS_REQUEST
})

/**
 * Sagas
 **/

export function* getEventsSaga() {
  try {
    const events = yield call(fetchEvents)

    yield put({
      type: GET_EVENTS_SUCCESS,
      payload: { events }
    })
  } catch (e) {
    yield put({
      type: GET_EVENTS_FAILED,
      error: e.message
    })
  }
}

export function* saga() {
  yield takeEvery(GET_EVENTS_REQUEST, getEventsSaga)
}
