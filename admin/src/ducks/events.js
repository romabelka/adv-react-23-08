import { appName, db } from '../config'
import { createSelector } from 'reselect'
import { Record, OrderedMap } from 'immutable'
import { put, call, takeEvery, all } from 'redux-saga/effects'

/**
 * Constants
 */
export const moduleName = 'events'

const prefix = `${appName}/${moduleName}`

const LOAD_EVENTS_REQUEST = `${prefix}/LOAD_EVENTS_REQUEST`
const LOAD_EVENTS_SUCCESS = `${prefix}/LOAD_EVENTS_SUCCESS`
const LOAD_EVENTS_ERROR = `${prefix}/LOAD_EVENTS_ERROR`

const eventsCollection = db.collection('events')

/**
 * Reducer
 */

const EventRecord = Record({
  id: null,
  date: null,
  title: null,
  venue: null
})

// TODO: loading:Boolean to the state
export default function reducer(state = new OrderedMap(), action) {
  const { type, payload } = action

  switch (type) {
    case LOAD_EVENTS_SUCCESS:
      const events = {}
      payload.forEach((doc) => {
        const data = doc.data()
        events[doc.id] = new EventRecord({
          id: doc.id,
          ...data,
          date: data.date.toMillis()
        })
      })
      return state.merge(events)

    default:
      return state
  }
}

/**
 * Selectors
 */

export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(stateSelector, (state) =>
  state.valueSeq().toArray()
)

/**
 * Action Creators
 */

export const loadEvents = () => ({ type: LOAD_EVENTS_REQUEST })

/**
 * Sagas
 */

export function* loadEventsSaga() {
  try {
    const querySnapshot = yield call([eventsCollection, eventsCollection.get])
    yield put({ type: LOAD_EVENTS_SUCCESS, payload: querySnapshot })
  } catch (error) {
    yield put({
      type: LOAD_EVENTS_ERROR,
      error
    })
  }
}

export function* saga() {
  yield all([takeEvery(LOAD_EVENTS_REQUEST, loadEventsSaga)])
}
