import { all, takeEvery, put, select, call } from 'redux-saga/effects'
import { appName } from '../config'
import { Record, OrderedMap, OrderedSet } from 'immutable'
import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { fbToEntities } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_SLICE_REQUEST = `${prefix}/FETCH_SLICE_REQUEST`
export const FETCH_SLICE_SUCCESS = `${prefix}/FETCH_SLICE_SUCCESS`

export const TOGGLE_SELECT = `${prefix}/TOGGLE_SELECT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  selected: new OrderedSet([]),
  entities: new OrderedMap()
})

export const EventRecord = Record({
  id: null,
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
    case FETCH_ALL_START:
      return state.set('loading', true)

    case FETCH_SLICE_REQUEST:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case FETCH_SLICE_SUCCESS:
      return state
        .set('loading', false)
        .mergeIn(['entities'], fbToEntities(payload, EventRecord))

    case TOGGLE_SELECT:
      return state.update(
        'selected',
        (selected) =>
          selected.has(payload.id)
            ? selected.remove(payload.id)
            : selected.add(payload.id)
      )

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventListSelector = createSelector(entitiesSelector, (entities) =>
  entities.valueSeq().toArray()
)

export const selectedIdsSelector = createSelector(stateSelector, (state) =>
  state.selected.toArray()
)

export const selectedEventsListSelector = createSelector(
  selectedIdsSelector,
  entitiesSelector,
  (ids, entities) => ids.map((id) => entities.get(id))
)
/**
 * Action Creators
 * */

export function fetchAllEvents() {
  return {
    type: FETCH_ALL_REQUEST
  }
}

export function fetchSliceRequest() {
  return {
    type: FETCH_SLICE_REQUEST
  }
}

export function fetchSliceSuccess(events) {
  return {
    type: FETCH_SLICE_SUCCESS,
    payload: events
  }
}

export function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    payload: { id }
  }
}

/**
 * Sagas
 * */

export function* fetchAllSaga() {
  const { loading, loaded } = yield select(stateSelector)
  if (loading || loaded) return

  const ref = firebase.database().ref('events')

  yield put({
    type: FETCH_ALL_START
  })

  const snapshot = yield call([ref, ref.once], 'value')

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: snapshot.val()
  })
}

export function* saga() {
  yield all([takeEvery(FETCH_ALL_REQUEST, fetchAllSaga)])
}

/**
 * Fetchers
 */

export function fetchEvents(limit = 10, startKey) {
  let query = firebase
    .database()
    .ref('events')
    .orderByKey()

  if (startKey) {
    // we need to increment the limit because we're starting from last record, NOT from next to the last one
    query = query.startAt(startKey).limitToFirst(limit + 1)
  } else {
    query = query.limitToFirst(limit)
  }

  return query.once('value').then((snapshot) => snapshot.val())
}

window.fetchEvents = fetchEvents
