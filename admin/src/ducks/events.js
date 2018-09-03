import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import firebase from 'firebase/app'
import { call, put, takeEvery } from 'redux-saga/effects'
import { getEventsFromDB } from './utils'

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
export const ReducerRecord = Record({
  events: new List([])
})

export const EventRecord = Record({
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS_SUCCESS:
      return state.update('events', (events) =>
        Object.values(payload.events).map((event) =>
          events.concat(new EventRecord({ ...event }))
        )
      )

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const rawEventsSelector = (state) => state[moduleName].events
export const eventsSelector = createSelector(rawEventsSelector, (events) =>
  events.entities.valueSeq().toArray()
)

/**
 * Action Creators
 * */

export const getEvents = () => ({
  type: GET_EVENTS_REQUEST
})

export const setEvents = (events) => ({
  type: GET_EVENTS_SUCCESS,
  payload: { events }
})

/**
 * Sagas
 **/

export function* getEventsSaga() {
  try {
    const dbEvents = firebase
      .database()
      .ref()
      .child('events')
    const events = yield call(getEventsFromDB, dbEvents)
    yield put(setEvents(events))
  } catch (error) {
    console.log(error)
  }
}

export function* saga() {
  yield takeEvery(GET_EVENTS_REQUEST, getEventsSaga)
}
