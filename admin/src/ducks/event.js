import { Record, Map } from 'immutable'
import { createSelector } from 'reselect'
import firebase from 'firebase/app'
import { call, put, takeEvery } from 'redux-saga/effects'
import { appName } from '../config'

/**
 * Constants
 * */
export const moduleName = 'event'
const prefix = `${appName}/${moduleName}`

export const FETCH_EVENTS_REQUEST = `${prefix}/FETCH_EVENTS_REQUEST`
export const FETCH_EVENTS_SUCCESS = `${prefix}/FETCH_EVENTS_SUCCESS`
export const FETCH_EVENTS_ERROR = `${prefix}/FETCH_EVENTS_ERROR`

/**
 * Reducer
 * */

export const ReducerRecord = Record({
  title: null,
  submissionDeadLine: null,
  url: null,
  when: null,
  where: null
})

const ReducerState = Record({
  entities: new Map([]),
  loading: false
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_EVENTS_REQUEST:
      return state.set('loading', true)

    case FETCH_EVENTS_SUCCESS:
      return state.set('loading', false).update('entities', (entities) => {
        let newEntities = entities
        payload.events.forEach((item) => {
          newEntities = newEntities.set(
            item.key,
            new ReducerRecord(item.toJSON())
          )
        })
        return newEntities
      })

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(stateSelector, (state) => {
  return state.entities
    .mapEntries(([key, item]) => {
      console.log(item, key)
      console.log(item.toJS())
      return [
        key,
        {
          id: key,
          ...item.toJS()
        }
      ]
    })
    .toArray()
})
export const isLoadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)

/**
 * Action Creators
 * */

export function fetchEvents() {
  return {
    type: FETCH_EVENTS_REQUEST
  }
}

/**
 * Sagas
 **/

export function* fetchEventsSaga() {
  const eventsRef = firebase.database().ref('events')

  try {
    const values = yield call([eventsRef, eventsRef.once], 'value')
    yield put({
      type: FETCH_EVENTS_SUCCESS,
      payload: { events: values }
    })
  } catch (error) {
    yield put({
      type: FETCH_EVENTS_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(FETCH_EVENTS_REQUEST, fetchEventsSaga)
}
